import { useState } from 'react'

function TaskState(initTitle:string,initDescription:string,initPriority:string):[title:string,description: string,priority: string,changeTitle: (value:string)=>void,changeDescription: (value:string)=>void,changePriority: (value:string)=>void] {
  const [title, setTitle] = useState<string>(initTitle);
  const [description, setDescription] = useState<string>(initDescription);
  const [priority, setPriority] = useState<string>(initPriority);
  const changeTitle=(value:string)=>setTitle(value)
  const changeDescription=(value:string)=>setDescription(value)
  const changePriority=(value:string)=>setPriority(value)
  return [title,description,priority,changeTitle,changeDescription,changePriority]
}

export default TaskState
