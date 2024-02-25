'use client'
import TaskDao, { TaskData } from "@/clientdb/DAO/TaskDao";
import styles from "./page.module.css";
import withObservables from '@nozbe/with-observables'
import UserDao, { UserData } from "@/clientdb/DAO/UserDao";
import { database } from "@/clientdb/db";
import TaskForm from "@/components/AddTask";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home({users,tasks}:{users:UserData,tasks:TaskData}) {
  const [userId,setUserId]=useState<string>('')
  const addTask=(value:any)=>{

  }
  useEffect(()=>{
    //TODO: Write logic to check for authentication and fetch user id
  },[])
  return (
    <>
    <Navbar />
    <main className={styles.main}>
      <TaskForm onSubmit={addTask} userId={userId}/>
    </main>
    </>
  );
}


// const enhance= withObservables([],()=>{
//   tasks: TaskDao.observeTasks();
//   users: UserDao.observeUsers()
// })

// export default enhance(Home)