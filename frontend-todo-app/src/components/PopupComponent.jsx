import { useState } from 'react';
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
    <div className='popupComponent'>
    <div>
    <input className='titleDiv'
    defaultValue={todo.title}
    onChange={(e)=>setTitle(e.target.value)}

    />
    </div>
    <div>
    <input className='contentDiv'
    defaultValue={todo.content}
    autoFocus
    onChange={(e)=>setContent(e.target.value)
    }

    />
    </div>
    <div className='buttonDiv'>    
    <button className='closeDiv' onClick={()=>{
        todoUpdate(todo.todo_id);
        props.handleTodoClose()
        // window.location.reload()
        }}>Close</button>
    <button className='deleteDiv' onClick={()=>{
        handleRemove(todo.todo_id);
        props.handleTodoClose(),
        window.location.reload()
        }}>Delete</button>
        </div>
    </div>
    </>
  );
};

export default PopupComponent;
