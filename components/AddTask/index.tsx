import styles from './addtask.module.css'
import { TaskData } from '@/app/page';
import TaskState from '@/hooks/TaskState';

interface TaskFormProps {
  onSubmit: (taskData: TaskData) => void;
  // userId: string
}

export const Priority: { [key: string]: string }={
  High: 'High',
  Normal: 'Normal',
  Low: 'Low'
}

export const Status: { [key: string]: string }={
  Pending: 'Pending',
  InProgress: 'InProgress',
  Completed: 'Completed'
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  // const [title, setTitle] = useState<string>('');
  // const [description, setDescription] = useState<string>('');
  // const [priority, setPriority] = useState<string>(Priority.Normal);
  const [title,description,priority,changeTitle,changeDescription,changePriority]=TaskState('','',Priority.Normal)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData:TaskData = {
      title,
      description,
      priority,
      status: 'pending',
    };
    onSubmit(taskData);
    // Reset form fields
    changeTitle('');
    changeDescription('');
    changePriority('Normal');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addtaskform}>
      <h2>Add Task</h2>
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
      <button type="submit" className='primary'>Submit</button>
    </form>
  );
};

export default TaskForm;
