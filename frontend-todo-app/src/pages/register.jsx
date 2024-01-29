import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/layout";

function Register() {
  
  const [values, setValues] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: "",
  })
  const [error, setError]= useState(false)
  const [success, setSuccess]= useState(false)

  const onChange = (e) => {
    setValues({...values,[e.target.name]: e.target.value})
  }

  const onSubmit = async (e) =>{
    e.preventDefault()

    try {
      const {data} = await onRegistration(values)

      setError("")
      setSuccess(data.message)
      setValues({email: "",firstName:"",lastName:"", password: ""})
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess("")
    }
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3"  > 
      <h1>Register</h1>

      <div className="mb-3" >
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
        onChange={(e)=> onChange(e)}
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={values.email}
        placeholder="Enter your email adddress"
        required
        />
      </div>

      <div className="mb-3" >
        <label htmlFor="firstName" className="form-label">
        First Name
        </label>
        <input
        onChange={(e)=> onChange(e)}
        type="firstName"
        className="form-control"
        id="firstName"
        name="firstName"
        value={values.firstName}
        placeholder="Enter your first name"
        required
        />
      </div>

      <div className="mb-3" >
        <label htmlFor="lastName" className="form-label">
        Last Name
        </label>
        <input
        onChange={(e)=> onChange(e)}
        type="lastName"
        className="form-control"
        id="lastName"
        name="lastName"
        value={values.lastName}
        placeholder="Enter your last Name"
        required
        />
      </div>

      

      <div className="mb-3">
        <label htmlFor="password" className="form-label" >
          Password
        </label>
        <input
        onChange={(e)=> onChange(e)}
        type="password"
        value={values.password}
        className="form-control"
        id="password"
        name="password"
        placeholder="Enter password"
        required
        />
      </div>

      <div style={{color:"red", margin:"10px 0"}} >{error}</div>
      <div style={{color:"green", margin:"10px 0"}} >{success}</div>

      <button type="submit" className="btn btn-primary" >
        Submit
      </button>

      </form>
    </Layout>
  );
}

export default Register;
