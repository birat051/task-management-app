import User from "@/datamodels/User";
import { database } from "../db";


export interface UserData extends User {
   name: string,
   emailId: string,
   updatedAt: Date,
   createdAt: Date
//    userId: string,
}

const users=database.collections.get<UserData>('users')

export default {
    observeUsers: ()=> users.query().observe(),
    createUser: async ({name,emailId}:{name:string,emailId:string})=>{
        await database.write(async ()=>{
            await users.create((user)=>{
                user.emailId=emailId
                user.name=name
            })
        })
    },
    deleteAll: async ()=>{
        await database.action(async ()=>{
            await users.query().destroyAllPermanently()
        })
    }
}