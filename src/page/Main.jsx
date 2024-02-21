import '../App.css';
import { useState, useEffect } from 'react';
import { Column } from '../Module/Column';
import { Header } from '../Module/Header';
import { useParams } from 'react-router-dom';

const taskStatus = [
  {name:'toDo', value:'open'}
, {name:'inProgress', value:'in progress'}
, {name:'done', value:'closed'}]

export const Main=()=> {

  const [tasks, setTasks] = useState([]);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const changeStatus = (id, newStatus)=>{
    setTasks(tasks.map((task)=>{
      if(task.id===id){
        return {...task, state: newStatus}
      }
      return task
    }))
      
  }
  const params = useParams();
  const owner = params.name;
  const repoName = params.repos
  useEffect(()=>{
    if(tasks&&tasks.length){
      localStorage.setItem(`${owner}/${repoName}`, JSON.stringify(tasks))
    }
}, [tasks]);

  return (
   
    <div className="container ">
       <Header setTasks={setTasks} tasks={tasks}/>
      <div className="row custom-vh-90">
        {taskStatus.map((status) =>
          <Column tasks={tasks} statusName={status.name} 
          draggedTaskId={draggedTaskId} 
          setDraggedTaskId={setDraggedTaskId} 
          statusValue={status.value} 
          changeStatus={changeStatus}/>
        )}
      </div>
    </div>

  );
}


