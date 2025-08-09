import React, {useState, useEffect,useRef} from 'react'

function Timer (props) 
{
  const [timeLeft,setTimeLeft]=useState(props.time);
  const [isRunning,setIsRunning]=useState(false);
  const timerRef = useRef(null);
  useEffect(() => {
    setTimeLeft(props.time);
  }, [props.time,props.activeTask]);
  useEffect(() => {
      timerRef.current?.focus();
    }, [isRunning]);
  useEffect(() => {
    if (props.autoStart && props.modes === "focus" && props.activeTask) 
    {
      setIsRunning(true);
    }
    else if (props.modes === "break" && props.activeTask) 
    {
      setIsRunning(true);
    }
    else if (!props.activeTask) 
    {
      setIsRunning(false);
    }
  }, [props.autoStart, props.modes, props.activeTask]);

  useEffect(() => {
    let interval=null;
  if(isRunning)
  {
    interval=setInterval(()=>{
      setTimeLeft((prevTime)=>{
        if(prevTime<=1)
        {
          clearInterval(interval);
          setIsRunning(false);
          props.onSessionEnd?.();
          return 0;
        }

        return prevTime-1;
      });
    },1000);
  }
  
  return () => clearInterval(interval); 
  }, [isRunning]);
  return (
    <div>
      <button
      onClick={() => props.onModeChange("focus")}
      className={`mode-button ${props.modes === "focus" ? "active-mode" : "non-active-mode"}`}
      >Focus</button>
      <button
      ref={timerRef}
      onClick={() => props.onModeChange("break")}
      className={`mode-button ${props.modes === "break" ? "active-mode" : "non-active-mode"}`}
      >Break</button>
      <br></br>
      <h1 className='time'>{formatTime(timeLeft)}</h1>
      <button onClick={() => setIsRunning(prev=>!prev)}
        className={`mode-button ${!isRunning ? "start-button" : "pause-button"}`} 
      >{isRunning?"Pause":"Start"}</button>
      <button onClick={() => {
        setIsRunning(false);
        setTimeLeft(props.time)
        }}
        className='mode-button non-active-mode'
        >Reset</button>
    </div>
  )
}
function formatTime(seconds) 
{
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${secs}`;
}

export default Timer