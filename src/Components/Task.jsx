import React from 'react';

function Task(props) {
  return (
    <div className="task-item">
      <div className="task-left">
        <input
          type='checkbox'
          checked={props.completed}
          className="task-checkbox"
          onChange={() => props.onToggleComplete(props.id)}
        />
        <div className="task-text">
          <p className="task-name">{props.name}</p>
          <p className="task-desc">{props.description}</p>
        </div>
      </div>

      <div className="task-right">
        <button
          className="task-delete"
          onClick={() => props.onDeleteTask(props.id)}
        >
          🗑
        </button>

        <div className="task-intervals">
          {props.completedIntervals}/{props.totalIntervals}
        </div>

        {!props.completed && <button
          className="start-button"
          onClick={() => props.onStartTask(props.id)}
        >
          Start
        </button>}
      </div>
    </div>
  );
}

export default Task;