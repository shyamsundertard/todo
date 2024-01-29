import { 
  BrowserRouter, 
  Navigate, 
  Routes, 
  Route, 
  Outlet } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import Login from "./pages/login";
import { useSelector } from 'react-redux';

const PrivateRoutes = () =>{
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet/> : <Navigate to="/todo/login" /> }</>
};

const RestrictedRoutes = () =>{
  const { isAuth } = useSelector((state) => state.auth)
  
  return <>{!isAuth ? <Outlet/> : <Navigate to="/todo/dashboard" /> }</>
};

function App() {
  

  return (
    <BrowserRouter>
    <Routes> 
    
      <Route element={<PrivateRoutes/>}> 
        <Route path="/todo/dashboard" element={<Dashboard/>} />
      </Route>
      
      <Route element={<RestrictedRoutes/>}> 
        <Route path="/todo/register" element={<Register/>} />
        <Route path="/todo/login" element={<Login/>} />
      </Route>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
