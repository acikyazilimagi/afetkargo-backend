import { Controller, Post } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { EmailerService } from "./emailer.service";

@Controller("emailer")
export class EmailerController {
    constructor(
        private readonly emailerService: EmailerService,
    ) {}

    @Post("test")
    @ApiExcludeEndpoint()
    sendTestEmail() {
        this.emailerService.sendTestMail();
    }

}