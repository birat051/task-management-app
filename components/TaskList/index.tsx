import React, { useState, useEffect } from 'react';
import { useDatabase } from '@nozbe/watermelondb/react';
import { Q } from '@nozbe/watermelondb';
import Task from '@/datamodels/Task';
import User from '@/datamodels/User';
import TaskComponent from '../Task';
import styles from './tasklist.module.css';

interface TaskDisplayProps {
  user: User;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ user }) => {
  const database = useDatabase();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    
    if (!user) return;

    const fetchTasks = async () => {
      try {
        const userTasks = await user.tasks.fetch();
        setTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // fetchTasks();

    const subscription = database.collections.get<Task>('tasks')
      .query(Q.where('user_id', user.id))
      .observe().subscribe(fetchTasks);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={styles.tasklist}>
      {tasks.map((task)=>{
        return (
       <TaskComponent task={task} key={task.id}/>
        )
      })}
    </div>
  );
};

export default TaskDisplay;
