import React, { useState } from "react";
import '../styles/NewTodo.css'

const NewTodo=(props)=>{
    const [title, setTitle]= useState("")
    const [content, setContent]= useState("")
    const id = parseInt(props.user.id);

    const createTodo = async (id)=>{
        try {
            await fetch ("http://localhost:8001/createTodo/"+ id,{
                method: "POST",
                body: JSON.stringify({title,content}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
        } catch (error) {
            console.error("Error occured while creating todo")
        }
    };

    return(
        <div className="create-div" >
            <div  >
            <input className="create-title-div"
            type="text"
            placeholder="Title"
            onChange={(e)=>setTitle(e.target.value)}
            />
            </div>
            <div  >
                <input className="create-content-div"
                type="text"
                placeholder="Take a note..."
                autoFocus
                onChange={(e)=> setContent(e.target.value)}
                />
            </div>
            <div className="bottom-bar">
            <button className="create-button-div" onClick={async()=>{
                if(title.length >0 && content.length >0){
               await createTodo(id),
                props.handleCreate(),
                window.location.reload()
                } else{
                    props.handleCreate()
                }
            }}
            >Close</button>
            </div>
        </div>
    )
}
export default NewTodo;