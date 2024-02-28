import Task from '@/datamodels/Task'
import TaskState from '@/hooks/TaskState'
import React, { useState } from 'react'
import styles from './task.module.css'
import { Priority, Status } from '../AddTask'

type TaskProp={
    task:Task
}

function TaskComponent(props:TaskProp) {
  const [title,description,priority,changeTitle,changeDescription,changePriority] = TaskState(props.task.title,props.task.description??'',props.task.priority)
  const [status,setStatus]=useState(props.task.status)
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    console.log('Updating task')
    props.task.updateTask({title,description,priority,status,updatedAt:new Date()}).then((res)=>{
        console.log('Got response: ',res)
        alert('Task successfully updated')
    })
    .catch((e)=>{
        'Unexpected error occured'
    })
  }

  const deleteRecord=()=>{
    props.task.deleteTask()
  }
  return (
    <div className={styles.taskformcontainer}>
    <form onSubmit={handleSubmit} className={styles.taskform}>
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => changeTitle(e.target.value)} required />
      
      <label>Description</label>
      <textarea value={description} onChange={(e) => changeDescription(e.target.value)} />
      
      <label>Priority</label>
      <select value={priority} onChange={(e) => changePriority(e.target.value)}>
        {Object.keys(Priority).map((value:string)=>{
          return (
            <option key={Priority[value]} value={Priority[value]}>{Priority[value]}</option>
          )
        })}
      </select>
      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {Object.keys(Status).map((value:string)=>{
          return (
            <option key={Status[value]} value={Status[value]}>{Status[value]}</option>
          )
        })}
      </select>
      <button type="submit" className='primary' disabled={title===props.task.title && description===props.task.description && priority === props.task.priority && status===props.task.status}>Update</button>
    </form>
          <button className='accent' onClick={deleteRecord}>Delete</button>
    </div>
  )
}

export default TaskComponent
