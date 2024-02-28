import {Model} from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import {field,date,readonly,writer, relation} from '@nozbe/watermelondb/decorators'
import User from './User';


export interface TaskType
{
    title: string;
    description: string;
    updatedAt: Date;
    priority: string;
    status: string;
    createdAt: Date;
    user:User;
    userId: string;
}

export default class Task extends Model
{
    static table='tasks'
    static associations:Associations= {
        users: {type: 'belongs_to',key:'user_id'}
    }

    @field('title') title!:string;
    @field('description') description:string|undefined;
    @field('status') status!:string;
    @field('priority') priority!:string;
    @readonly @date('created_at') createdAt!:Date;
    @readonly @date('updated_at') updatedAt!:Date;
    @field('user_id') userId!: string;
    @relation('users','user_id') user!:User;

    async getTask()
    {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            priority: this.priority,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId
        }
    }

    // @writer async updateTask({title, description,updatedAt,priority,status}: {title: string, description: string, updatedAt:Date,priority:string,status:string})
    // {
    //     console.log('Updating task inside model')
    //     return await this.update((task)=>{
    //         task.title=title,
    //         task.description=description,
    //         task.updatedAt=updatedAt,
    //         task.priority=priority,
    //         task.status=status
    //     })
    // }

    @writer async updateTask({title, description, updatedAt, priority, status}: {title: string, description: string, updatedAt: Date, priority: string, status: string})
{
    console.log('Updating task inside model')
    try {
        const result = await this.update((task) => {
            task.title = title;
            task.description = description;
            // task.updatedAt = updatedAt;
            task.priority = priority;
            task.status = status;
        });
        console.log('Task updated successfully:', result);
        return result;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error; // rethrowing the error to be caught by the calling function
    }
}

    @writer async deleteTask()
    {
        return await Promise.all([this.markAsDeleted(),this.destroyPermanently()])
    }
}
