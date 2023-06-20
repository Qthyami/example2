import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
export type TaskType=  {
    id: string,
    title: string,
    isDone: boolean
}
 type TodolistPropsType={
    header:string;
    tasks:TaskType[];
     destroyLine: (killId:string)=> void;
     setFiltrator: (filterSetting:filterType)=>void;
     changeCheckBox : (checkId:string, checkBoxStatus:boolean) => void;
     addTask: (inputValue:string)=> void;
     filter:filterType;



}
export type filterType = 'all'| "completed" | "active"

const Todolist = (props:TodolistPropsType) => {
   const [inputValue, setInputValue]=useState<string>('')
    const [error, setError]=useState<string| null>(null)
const allHandler =()=>{
    props.setFiltrator('all')
}
const completedHandler = ()=>{
    props.setFiltrator("completed")
}
const activeHandler = () => {
    props.setFiltrator("active")
}
    const renderTasks=()=>{



        return props.tasks.map(t=> {
            const destroyLine =()=> props.destroyLine(t.id)
            const checkBoxControl=(event:ChangeEvent<HTMLInputElement>)=> {
         props.changeCheckBox(t.id, event.currentTarget.checked)
            }

            return (
                <div>
                    <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={checkBoxControl}
                        />
                        {t.title}
                        <button
                            onClick={destroyLine}> ✖ </button>
                    </li>
                </div>

            )
        })
    }

    function inputHandler(event:ChangeEvent<HTMLInputElement >) {
        setError(null);
        setInputValue(event.currentTarget.value);


    }

    const onClicker = () => {
        if (inputValue.trim() !== "") {
            props.addTask(inputValue.trim());

            setInputValue("");
        } else {
            setError("ВВЕДИ ЗНАЧЕНИЕ")
        }
    };
   const onKeyDowner=(event:KeyboardEvent<HTMLInputElement>)=>{

       if( event.key ==="Enter") {
           onClicker();
      }

   }



    return (
        <div className={"Todolist"}>
            <h1>{props.header}</h1>
            <input onChange={inputHandler}
                   onKeyDown={onKeyDowner}
                   className={error? 'error' : '' }


            />


            <button onClick={onClicker}>+</button>
            {error&& <div className="error-message">{error}</div>}
            <ul>{renderTasks()}</ul>
            <button className={props.filter==="all"? "btn" : ""} onClick={allHandler}>All</button>
            <button className={props.filter==="completed"? "btn" : ""}onClick={completedHandler}>Completed</button>
            <button className={props.filter==="active"? "btn" : ""}onClick={activeHandler}>Active</button>


        </div>
    );
};

export default Todolist;