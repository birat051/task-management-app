'use client'
import styles from "./page.module.css";
import TaskForm from "@/components/AddTask";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDatabase } from "@nozbe/watermelondb/react";
import { Q } from "@nozbe/watermelondb";
import User from "@/datamodels/User";
import EnhancedTaskList from "@/components/TaskList";
import TaskList from "@/components/TaskList";
import TaskDisplay from "@/components/TaskList";
import Head from "next/head";

export interface TaskData{
    title: string;
    description: string;
    priority: string;
    status: string;
}

export default function Home() {
  const database = useDatabase()
  const [user, setuser] = useState<User | null>(null)
  useEffect(()=>{
    async function getUser()
    {
      if(user)
      return
      try{
      const emailId:string|null=localStorage.getItem('active_user')
      if(emailId)
      {
      console.log('Email is: ',emailId)
      // const user = await database.get('users').find(emailId)
      const user = await database.collections.get('users')
      .query(
      Q.where('email_address', emailId),
      Q.sortBy('updated_at', Q.desc),
      Q.take(1)
      )
      .fetch();
      if(user.length>0)
      {
        console.log('User is: ',user)
        setuser(user[0] as User)
      }
      }
    }
    catch(e)
    {
      console.log('Unexpected error occured: ',e)
    }
    }
    getUser()
  },[database])

  useEffect(()=>{
    document.title='Home'
  },[])

  const addTask=(value:TaskData)=>{
    if(user)
    {
      user.addTask(value.title,value.description,value.priority,value.status)
    }
  }

  return (
    <>
    <Navbar />
    <main className={styles.main}>
      <TaskForm onSubmit={addTask}/>
      {user && <TaskDisplay user={user}/>}
    </main>
    </>
  );
}