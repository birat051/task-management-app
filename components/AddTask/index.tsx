import React, { useState } from 'react';
import styles from './addtask.module.css'

interface TaskFormProps {
  onSubmit: (taskData: any) => void;
  userId: string
}

const Priority: { [key: string]: string }={
  High: 'High',
  Normal: 'Normal',
  Low: 'Low'
}

const Status={
  Pending: 'Pending',
  InProgress: 'InProgress',
  Completed: 'Completed'
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit,userId }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>(Priority.Normal);
  const [dueDate, setDueDate] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      priority,
      dueDate,
      userId,
      status: 'pending',
      remoteStatus: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onSubmit(taskData);
    // Reset form fields
    setTitle('');
    setDescription('');
    setPriority('Normal');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addtaskform}>
      <h2>Add Task</h2>
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      
      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      
      <label>Priority</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        {Object.keys(Priority).map((value:string)=>{
          return (
            <option key={Priority[value]} value={Priority[value]}>{Priority[value]}</option>
          )
        })}
      </select>
      <label>Due Date</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required/>
      
      <button type="submit" className='primary-button'>Submit</button>
    </form>
  );
};

export default TaskForm;
