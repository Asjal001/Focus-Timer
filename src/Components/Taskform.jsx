import React,{useState,useRef,useEffect} from 'react'

function Taskform(props) 
{
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const nameInputRef = useRef(null);
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);
  const handleSubmit = (e) =>{
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      totalIntervals: parseInt(duration,10),
      completedIntervals: 0,
      completed: false
    };
    props.onAddTask(newTask);
    setName("");
    setDescription("");
    setDuration("");
  };

  return (
    <div className="taskform-container">
      <form onSubmit={handleSubmit}>
        <input 
          ref={nameInputRef}
          value={name} 
          type='text' 
          placeholder='Task Name'
          onChange={(e)=> setName(e.target.value)}
          required
        ></input>
        <input 
          value={description} 
          type='text' 
          placeholder='Task Description'
          onChange={(e)=> setDescription(e.target.value)}
        ></input>
        <input 
          value={duration} 
          type='number' 
          placeholder='Time (number of focus-intervals)'
          onChange={(e)=> setDuration(e.target.value)}
          min="0"
          required
        ></input>
        <div>
          <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Save</button>
        </div>
        
      </form>
    </div>
  )
}

export default Taskform