import React from 'react'
import Task from './Task';

function Tasklist(props) 
{
  if(props.tasks.length===0)
    {
      return <h4>No Tasks Added Yet</h4>;
    }

  return (
    <div>
      
      {props.tasks.map((task)=>(
        <Task
          id={task.id}
          key={task.id}
          name={task.name}
          description={task.description}
          totalIntervals={task.totalIntervals}
          completedIntervals={task.completedIntervals}
          completed={task.completed}
          onToggleComplete={props.onToggleComplete}
          onStartTask={props.onStartTask}
          onDeleteTask={props.onDeleteTask}
        />
      ))}

    </div>
  )
}

export default Tasklist