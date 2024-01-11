import React, { useState } from 'react';
import "../styles/PopupComponent.css";


const PopupComponent = (props) => {
    const [todo, setTodo] = useState(props.todo);
    const [title, setTitle] = useState(todo.title);
    const [label, setLabel] = useState(todo.label);
    const [content, setContent] = useState(todo.content);

    const todoUpdate = async (id) => {
        try {
          const response = await fetch("http://localhost:8001/todos/"+id, {
            method: "PUT",
            body: JSON.stringify({ title, label, content }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error changing todo:", error);
        }
      };

      const handleRemove = async (id) => {
        try {
          const response = await fetch("http://localhost:8001/todos/"+id, {
            method: "DELETE",
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      };

  return (
    <>
    <div className='popup-component'>
    <div onClick={props.handleTodoClick} ></div>
    <div>
    <input className='title-div'
    defaultValue={todo.title}
    onChange={(e)=>setTitle(e.target.value)}

    />
    </div>
    <div>
    <input className='content-div'
    defaultValue={todo.content}
    onChange={(e)=>setContent(e.target.value)}

    />
    </div>
    <div className='button-div'>    
    <button className='close-div' onClick={()=>{
        todoUpdate(todo.todo_id);
        props.handleTodoClose()
        }}>Close</button>
    <button className='delete-div' onClick={()=>{
        handleRemove(todo.todo_id);
        props.handleTodoClose()
        }}>Delete</button>
        </div>
    </div>
    </>
  );
};

export default PopupComponent;
