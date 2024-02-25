import { Model } from "@nozbe/watermelondb";
import { Associations } from '@nozbe/watermelondb/Model'
import {field,date,readonly,children,action} from '@nozbe/watermelondb/decorators'

export default class User extends Model
{
    static table='users'
    static associations:Associations= {
        tasks: {type: 'has_many',foreignKey:'user_id'}
    }
    @field('user_id') userId!:string;
    @field('name') name!:string;
    @field('email_address') emailId!:string;
    @field('session_token') sessionToken!:string;
    @children('tasks') tasks!:any;

    @action async getUser()
    {
        return {
            userId: this.userId,
            name: this.name,
            emailId: this.emailId,
            refreshToken: this.sessionToken
        }
    }

    @action async updateRefreshToken({refreshToken}:{refreshToken:string})
    {
        return await this.update((user)=>{
            user.sessionToken= refreshToken
        })
    }

    @action async deleteAllTasks()
    {
        return this.tasks.destroyAllPermanently()
    }
}