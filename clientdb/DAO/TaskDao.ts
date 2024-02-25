import Task from "@/datamodels/Task";
import { database } from "../db";


export interface TaskData extends Task {
    title: string;
    description: string | undefined;
    status: string;
    priority: string;
    dueDate: Date;
    userId: string;
    remoteStatus: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const tasks=database.collections.get<TaskData>('tasks')

export default {
    observeTasks: ()=> tasks.query().observe(),
    createTask: async ({title,description,priority,userId,dueDate,remoteStatus,status}:{title: string, description: string, dueDate: Date,updatedAt:Date,priority:string,status:string,userId:string,remoteStatus:boolean})=>{
        await database.action(async ()=>{
            await tasks.create((task)=>{
                task.title=title
                task.description=description
                task.priority=priority
                task.userId=userId
                task.dueDate=dueDate
                task.remoteStatus=remoteStatus
                task.status=status
            })
        })
    },
    deleteAll: async ()=>{
        await database.action(async ()=>{
            await tasks.query().destroyAllPermanently()
        })
    }
}