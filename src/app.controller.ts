import { Controller, Get } from "@nestjs/common";
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";
import { AppService } from "./app.servce";


@Controller('/api')
export class AppController { }