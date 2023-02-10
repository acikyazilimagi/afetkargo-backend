import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/modules/user/model/user.entity";

//TODO set all to env variables 

@Injectable()
export class EmailerService {
    constructor(
        private readonly mailerService: MailerService,
        // @Inject(WINSTON_MODULE_PROVIDER)
        // private readonly logger: Logger,
    ) {}

    async sendTestMail() {
        try{
            const url = "localhost:3000/users/activate/";
            await this.mailerService.sendMail({
                to: "haticeytm.ytm@gmail.com",
                from: `"IDeal" <${process.env.AWS_EMAIL_FROM}>`,
                subject: "Test Mail",
                template: "./test.hbs",
                context: {
                    name: "Hatice Yetimoglu",
                    url
                }
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    async sendPasswordReset(user: User, token: string): Promise<any> {
        const url = `${process.env.PASSWORD_RESET_URL}/${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            from: `"Yükle Gelsin" <${process.env.AWS_EMAIL_FROM}>`,
            subject: 'Şifre Sıfırlama',
            template: './password_reset.hbs',
            context: {
                name: user.name + " " + user.surname,
                url
            }
        })
    }

    async sendUserConfirmationMail(user: User, token: string): Promise<any> {
        const url = `${process.env.CONFIRMATION_MAIL_URL}/${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            from: `"Yükle Gelsin" <${process.env.AWS_EMAIL_FROM}>`,
            subject: "Yükle Gelsin'e hoş geldin! Email adresini aktive et.",
            template: './register_confirmation.hbs',
            context: {
                name: user.name + " " + user.surname, 
                url,
            }
        });
    }

    async sendExceptionMail(errorMessage: string): Promise<void> {
        const message = `There is an error in app. Message: ${errorMessage}`;
        await this.mailerService.sendMail({
            to: process.env.ADMIN_USER_MAIL,
            from: `"Yükle Gelsin" <${process.env.AWS_EMAIL_FROM}>`,
            subject: "Yükle Gelsin App'in de Hata Var!",
            template: './exception.hbs',
            context: {
                message
            }
        });
    }
}