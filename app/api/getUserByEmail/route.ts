import { pool } from "@/serverdb/db"
import { getSession } from "next-auth/react"
import { NextResponse } from "next/server"

const handler=async (req:Request)=>{
    // const session = await getSession()
  
    // // Check if the user is authenticated
    // if (!session) {
    //   return NextResponse.json({
    //     error: 'User is not authenticated',
    //   },{status:401})
    // }   

    const body=await req.json()

    const {email} = body

    if(!email)
    {
      return NextResponse.json({
        error: 'Email id not provided',
      },{status:400})
    }

    const client=await pool.connect()

    try{
      const result = await client.query('SELECT * FROM users WHERE email_address = $1', [email]);
      const user = result.rows[0];
      if(user)
      {
        return NextResponse.json({
          email: user.email_address,
          userId: user.user_id,
          name: user.name
        },{status: 200})
      }
      return NextResponse.json({
        message: 'Couldnot find a user with this email id'
      },{status: 404})
    }
    catch(e)
    {
      console.log(e)
      return NextResponse.json({
        message: 'Unexpected error occured'
      },{status: 500})
    }
    finally{
      client.release()
    }
}

export {handler as POST}