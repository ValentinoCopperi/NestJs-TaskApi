import { OnModuleInit } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server } from "socket.io";
import { TasksService } from "../tasks.service";


@WebSocketGateway()
export class TaskGateway implements OnModuleInit {

    @WebSocketServer()
    server : Server;  
    onModuleInit() {
        
    }

    notifyNewTask(){
        this.server.emit('newTask')
    }

}

