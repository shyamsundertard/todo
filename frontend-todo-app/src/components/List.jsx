// import "../styles/List.css";
// import React, { useState } from "react";
// import PopupComponent from '../components/PopupComponent';
// import LabelList from "./LabelList";

// function List(){
//     const [todo, setTodo] = useState(null);
//     const [showTodo, setShowTodo] = React.useState(false);

//     const [todos, setTodos] = React.useState([]);

//     React.useEffect(()=>{
//         const fetchData = async()=>{
//             try {
//                 const response = await fetch ("http://localhost:8001/todos");
//                 const data = await response.json();
//                 setTodos(data);
//             } catch(error){
//                 console.error("Error fetching todos:", error);
//             }
//         };
//         fetchData();
//     }, [todos]);

//     const handleTodoClick = () => {
//           setShowTodo(true);
//     };

//     const handleTodoClose = () => {
//         setShowTodo(false);
//     };
    
//     return  (
//         <div className="main-container">
//         <LabelList/>
//         <div className="display-container">
//         <div className="todo-list">
//             {todos.map((todo) => (
//               <div key={todo.todo_id} 
//               onClick={()=>{
//                 setShowTodo(true);
//                 setTodo(todo);
//               }} 
//               className="todo-container">
//              <div><b>{todo.title}</b></div>
//               <div className="content">{todo.content}</div>
//               </div>
//             ))}
            
//         </div>
//         <div className="popup-div">
//             {showTodo && <PopupComponent  todo={todo} handleTodoClick={handleTodoClick} handleTodoClose={handleTodoClose} />}
//             </div>
//             </div>
//             </div>
//     )                  
// }
// export default List;