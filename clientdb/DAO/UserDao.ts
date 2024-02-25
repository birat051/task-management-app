import User from "@/datamodels/User";
import { database } from "../db";


export interface UserData extends User {
   name: string,
   emailId: string,
   userId: string,
}

const users=database.collections.get<UserData>('users')

export default {
    observeUsers: ()=> users.query().observe(),
    createUser: async ({name,emailId,userId}:{name:string,userId:string,emailId:string})=>{
        await database.write(async ()=>{
            await users.create((user)=>{
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