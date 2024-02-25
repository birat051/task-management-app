import User from "@/datamodels/User";
import { database } from "../db";


export interface UserData extends User {
   name: string,
   emailId: string,
   userId: string,
   refreshToken: string
}

const users=database.collections.get<UserData>('users')

export default {
    observeUsers: ()=> users.query().observe(),
    createTask: async ({name,emailId,userId,refreshToken}:{name:string,userId:string,emailId:string,refreshToken:string})=>{
        await database.action(async ()=>{
            await users.create((user)=>{
                user.refreshToken=refreshToken
                user.emailId=emailId
                user.name=name
                user.userId=userId
            })
        })
    },
    deleteAll: async ()=>{
        await database.action(async ()=>{
            await users.query().destroyAllPermanently()
        })
    }
}