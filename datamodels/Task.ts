import {Model} from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import {field,date,readonly,children,action} from '@nozbe/watermelondb/decorators'


export interface TaskType
{
    title: string;
    description: string;
    dueDate: Date;
    updatedAt: Date;
    priority: string;
    status: string;
    createdAt: Date;
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
    @date('due_date') dueDate!: Date;
    @field('user_id') userId!: string;

    @action async getTask()
    {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            priority: this.priority,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            dueDate: this.dueDate,
            userId: this.userId
        }
    }

    @action async updateTask({title, description, dueDate,updatedAt,priority,status}: {title: string, description: string, dueDate: Date,updatedAt:Date,priority:string,status:string})
    {
        return await this.update((task)=>{
            task.title=title,
            task.description=description,
            task.dueDate=dueDate,
            task.updatedAt=updatedAt,
            task.priority=priority,
            task.status=status
        })
    }

    @action async deleteTask()
    {
        return await Promise.all([this.markAsDeleted(),this.destroyPermanently()])
    }

}
