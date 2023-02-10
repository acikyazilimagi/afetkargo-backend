import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailerService } from "./emailer.service";
import { EmailerController } from "./emailer.controller";
import * as dotenv from 'dotenv';
import { dotEnvOptions } from './../../config/dotenv-options';
dotenv.config(dotEnvOptions);

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.AWS_EMAIL_SMTP_SERVER,
                ignoreTLS: true,
                secure: true,
                auth: {
                    user: process.env.AWS_EMAIL_USER,
                    pass: process.env.AWS_EMAIL_PASSWORD
                }
            },
            defaults: {
                from: `"No Reply" <${process.env.AWS_EMAIL_FROM}>"`
            },
            template: {
                dir: __dirname + "/templates",
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }
        })
    ],
    providers: [EmailerService],
    controllers: [EmailerController],
    exports: [EmailerService]
})
export class EmailerModule { }