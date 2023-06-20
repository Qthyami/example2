import React, {useState} from 'react';

import './App.css';
import Todolist, {filterType, TaskType} from "./Todolist";
import {v1} from "uuid";
const header="What to learn"
function App() {
  let  tasks_1 :TaskType[] = [
    {id:v1(), title:"HTML&CSS", isDone: true},
    {id:v1(), title:"JS", isDone: true},
    {id:v1(), title:"ReactJS", isDone: false},
    {id:v1(), title:"Redux", isDone: true},
    {id:v1(), title:"1C", isDone: true}

  ]

  let [tasks, setTasks]= useState<TaskType[]>(tasks_1);
  let [filter, setFilter] = useState<filterType >("all");

  const destroyLine=(killId:string)=> {
    setTasks( tasks.filter(t => t.id !==killId ))
  };
  const setFiltrator=(filterSetting:filterType)=>{
    setFilter(filterSetting);
    console.log(filterSetting)
  }

  const greatFiltrator=(tasksArg:TaskType[] , filterArg:filterType)=>{
    if (filterArg === "completed") {
      tasksArg= tasksArg.filter(t => t.isDone);
    } if(filterArg === "active" ) {
      tasksArg= tasksArg.filter(t => !t.isDone);
    }

    return tasksArg;

  }
  const tasksFiltered = greatFiltrator(tasks,filter);

  const changeCheckBox=(checkId:string, checkBoxStatus:boolean)=> {
    setTasks(
        tasks.map(t=>{
        return  t.id === checkId? {...t, isDone:checkBoxStatus}: t
        })
    )
  }
  const addTask = (inputValue: string)=>{
    let newTask = {id:v1(), title:inputValue, isDone: false}
    setTasks( [newTask, ...tasks]);

  }
  return (
    <div className="App">
      <Todolist
      header={header}
      tasks = {tasksFiltered}
      destroyLine ={destroyLine}
      setFiltrator={setFiltrator}
      changeCheckBox = {changeCheckBox}
      addTask={addTask}
      filter={filter}

      />
    </div>
  );
}

export default App;
