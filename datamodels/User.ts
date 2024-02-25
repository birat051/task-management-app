import { Model } from "@nozbe/watermelondb";
import { Associations } from '@nozbe/watermelondb/Model'
import {field,date,readonly,children,action, writer} from '@nozbe/watermelondb/decorators'


export interface UserType
{
    userId:string,
    name:string,
    emailId: string
}

export default class User extends Model
{
    static table='users'
    static associations:Associations= {
        tasks: {type: 'has_many',foreignKey:'user_id'}
    }
    @field('user_id') userId!:string;
    @field('name') name!:string;
    @field('email_address') emailId!:string;
    @children('tasks') tasks!:any;

    async getUser()
    {
        return {
            userId: this.userId,
            name: this.name,
            emailId: this.emailId,
        }
    }


    async deleteAllTasks()
    {
        return this.tasks.destroyAllPermanently()
    }
}