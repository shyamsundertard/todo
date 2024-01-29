import { useEffect, useState } from 'react'
import { fetchProtectedInfo } from '../api/auth'
import Layout from '../components/layout'
import PopupComponent from '../components/PopupComponent'
import NewTodo from '../components/NewTodo'
import "../styles/Dashboard.css"
import ClickAlert from '../components/ClickAlert'
// import {todoUpdate, todoRemove} from "../components/PopupComponent"

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState([])
  const [user, setUser] = useState()
  const [todo, setTodo] = useState(null)
  const [showTodo, setShowTodo]= useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showBar, setShowBar] = useState(true)

  const handleCreate =()=>{
    setShowForm(false),
    setShowBar(true)
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()
      setUser(data.user);
      setProtectedData(data.todos);
    } catch (error) {
      console.error("error occured")
    }finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    protectedInfo()
  }, []);
  

  const handleTodoClick =()=>{
    setShowTodo(true);
  };

  const handleTodoClose =()=>{
    setShowTodo(false);
  };

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
      <Layout>
        <div className='mainPage' >
          <div className='labelContainerBox'>
          <div className='labelContainerParent'>
          <div className='labelContainer'>
            <h6>Hi</h6>
          </div>
          </div>
          </div>
        <div className='mainContainerParent'>
        <div className='mainContainer'>
          <ClickAlert activeFunction="handleCreate" handleCreate= {handleCreate}>
        <div className='todoFormContainer'>
              <div>
              {showBar && 
                <input className='popupBar'
                type='text'
                placeholder='Take a note...'
                autoFocus
                onClick={()=>{setShowForm(true),setShowBar(false)}}
                /> }
              {showForm && <NewTodo user={user} showBar={showBar} handleCreate = {handleCreate} />}
              </div>
            </div>
            </ClickAlert>
        <div className='displayContainer' >
          <div className='todoList'>
        {protectedData.map(todo => (
        <div key={todo.todo_id} 
        onClick={()=>{
          setShowTodo(true);
          setTodo(todo)
        }}
        className="todoContainer"
        id={todo.todo_id} >
          <div><b>{todo.title}</b></div>
          <div className="content">{todo.content}</div>
        </div>
         ))}
        </div>
        </div>
        </div>
        </div>
        {showTodo && <div className='popupDivParent'>
        <ClickAlert activeFunction="handleTodoClose" handleTodoClose={handleTodoClose}>
        <div className="popupDiv">
             <PopupComponent todo={todo} handleTodoClick={handleTodoClick} handleTodoClose={handleTodoClose} />
            </div>
            </ClickAlert>
            </div>}
        </div>

      </Layout>
    
  )
}

export default Dashboard


  