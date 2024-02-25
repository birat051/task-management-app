import bcrypt from 'bcrypt';
import { pool } from "@/serverdb/db";
import { NextResponse } from "next/server";

const handler=async (req:Request)=>{
    const client = await pool.connect();
    try{
        const body=await req.json()
        const {email,name,password}=body
        if (!name) {
            return NextResponse.json({ message: 'Name is required' },{status: 400});
        }
        if (!email) {
            return NextResponse.json({ message: 'Email is required' },{status: 400});
        }
        if (!password) {
            return NextResponse.json({ message: 'Password is required' },{status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
        INSERT INTO users (name, email_address, password)
        VALUES ($1, $2, $3)
        RETURNING user_id, name, email_address, created_at, updated_at
    `;
        const values = [name, email, hashedPassword];
        const result = await client.query(query, values);
        // Return the newly created user
        const newUser = result.rows[0];
        if(newUser)
        return NextResponse.json({user: newUser},{status: 201});
        return NextResponse.json({message: 'Couldnot create a user'},{status: 400});
    }
    catch(e)
    {
        console.log('Unexpected error occured during signup: ',e)
        return NextResponse.json({message: 'Unexpected error occured'},{status: 500})
    }
    finally{
        console.log('Releasing client')
        client.release();
    }
}

export {handler as POST}