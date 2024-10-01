import { OnModuleInit } from "@nestjs/common";
import { Server } from "socket.io";
export declare class TaskGateway implements OnModuleInit {
    server: Server;
    onModuleInit(): void;
    notifyNewTask(): void;
}
