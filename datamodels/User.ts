import { Model } from "@nozbe/watermelondb";
import { Associations } from '@nozbe/watermelondb/Model'
import {field,children,writer, readonly, date} from '@nozbe/watermelondb/decorators'
import Task, { TaskType } from "./Task";

export interface UserType
{
    // userId:string,
    name:string,
    emailId: string,
    createdAt: Date,
    updatedAt: Date
}

export default class User extends Model
{
    [x: string]: any;
    static table='users'
    
    static associations:Associations= {
        tasks: {type: 'has_many',foreignKey:'user_id'}
    }

    // @field('user_id') userId!:string;
    @field('name') name!:string;
    @field('email_address') emailId!:string;
    @children('tasks') tasks!:any;
    @readonly @date('created_at') createdAt!:Date;
    @readonly @date('updated_at') updatedAt!:Date;

    async getUser()
    {
        return {
            // userId: this.userId,
            name: this.name,
            emailId: this.emailId,
            createdAt: this.createdAt,
            updatedAt:this.updatedAt
        }
    }


    async deleteAllTasks()
    {
        return this.tasks.destroyAllPermanently()
    }

    @writer async addTask(title:string,description:string,priority:string,status:string)
    {
        return await this.collections.get<Task>('tasks').create((task) => {
            task.user.set(this);
            task.title = title;
            task.description=description;
            task.priority=priority;
            task.status=status;
        });
    }
}