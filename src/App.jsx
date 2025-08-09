import { useEffect, useState } from 'react'
import './App.css'
import Timer from './Components/Timer'
import Taskform from './Components/Taskform';
import Tasklist from './Components/Tasklist';
function App() {
  const [mode, setMode] = useState("focus");
  const [duration, setDuration] = useState(1800);
  const [isFormVisible, setIsFormVisible]=useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [autoStart, setAutoStart]=useState(false);
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(tasks));
    const completedTask = tasks.find(task => task.id===activeTask)?.completed || "";
    if(completedTask)
    {
      setActiveTask(null);
    }
  }, [tasks]);
  const handleSessionEnd = ()=>{
    if (mode === "focus" && activeTask) 
    {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === activeTask
            ? {
                ...task,
                completedIntervals: task.completedIntervals + 1,
                completed:
                  task.completedIntervals+1 >= task.totalIntervals
              }
            : task
        )
      );
    }
    if(mode==="focus")
    {
      setMode("break");
      setDuration(300);
    }
    else
    {
      setMode("focus");
      setDuration(1800);
      setAutoStart(false); 
    }
  };
  const handleModeChange = (newMode)=>{
    setMode(newMode);
    setDuration(newMode==="focus"?1800:300);
  }
  function handleAddTask(task)
  {
    setTasks((prevTasks)=>[...prevTasks,task]);
    setIsFormVisible(false);
  } 
  function handleCancel()
  {
    setIsFormVisible(false);
  }
  function toggleCompleteHandler(id)
  {
    const updatedTasks=tasks.map(task => 
      task.id===id?{...task,completed: !task.completed}:task);
      setTasks(updatedTasks);
  }
  function deleteTaskHandler(id)
  {
    const updatedTasks=tasks.filter(task => task.id!==id);
    setTasks(updatedTasks);
    if(id===activeTask)
    {
      setActiveTask(null);
    }
  }
  function startTaskHandler(id)
  {
    setActiveTask(id);
    setMode("focus");
    setDuration(1800);
    setAutoStart(true);
  }

  const activeTaskName = tasks.find(task => task.id===activeTask)?.name || "";
return (
    <>
    <h1>{mode==="focus"?"Focus Time": "Break Time"}</h1>
      <Timer 
      activeTask={activeTask}
      time={duration}
      modes={mode}
      autoStart={autoStart}
      onSessionEnd={handleSessionEnd}
      onModeChange={handleModeChange}
      />
      {activeTask && <h5 style={{ marginTop: "10px" }}> Currently Running: {activeTaskName}</h5>}
      <h3>Tasks</h3>
      <hr /> 
      <Tasklist
      tasks={tasks}
      onToggleComplete = {toggleCompleteHandler}
      onDeleteTask = {deleteTaskHandler}
      onStartTask = {startTaskHandler}
      />
      <button className='add-task-btn' onClick={()=> setIsFormVisible(true)}>+ Add Task</button>
      {isFormVisible && (
        <Taskform
          onAddTask={handleAddTask}
          onCancel={handleCancel}
        />
      )}
    </>
  )
}

export default App
