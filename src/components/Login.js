import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({email: "", password: ""})
  let navigate = useNavigate();

  const handleSubmit= async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    if (json.success) {
        //Save the auth-token and Re-Direct
        console.log(json)
        localStorage.setItem("token", json.authToken);
        props.showAlert("Logged In Successfully", "success")
        navigate("/")
    }
    else{
      props.showAlert("Inavlid Credentials", "danger")
    }
  }
  const onChange = (e)=> {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <h1>Please Login to continue to iNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
            <label htmlFor="email" className="form-label"><h3>Email address</h3></label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} style={{ backgroundColor: "#032c4d", color: "white" }} />
            <div id="emailHelp" className="form-text" style={{color: "gray"}}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label"><h3>Password</h3></label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} style={{ backgroundColor: "#032c4d", color: "white" }} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
