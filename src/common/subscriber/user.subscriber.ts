import { User } from "../../modules/user/model/user.entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { generateHash } from "../utils/hash";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User>{
    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>): void {
        if(event.entity.password) {
            event.entity.password = generateHash(event.entity.password);
        }
    }

    beforeUpdate(event: UpdateEvent<User>): void {
        const entity = event.entity as User;
        if(entity.password !== event.databaseEntity.password) {
            entity.password = generateHash(entity.password!);
        }
    }   
}