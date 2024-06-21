import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup =(props) => {
  const [credentials, setCredentials] = useState({name: "",email: "", password: "", cpassword: ""})
  let navigate = useNavigate();
  const handleSubmit= async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    if (json.success) {
      //Save the auth-token and Re-Direct
      localStorage.setItem("token", json.authToken);
      props.showAlert("Account Created Successfully", "success");
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
      <h1>Create an account to continue</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3 my-5">
            <label htmlFor="name" className="form-label"><h3>Name</h3></label>
            <input type="text" className="form-control" id="name" name="name" value={credentials.name} aria-describedby="emailHelp" onChange={onChange} required style={{ backgroundColor: "#032c4d", color: "white" }} />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label"><h3>Email address</h3></label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required style={{ backgroundColor: "#032c4d", color: "white" }} />
            <div id="emailHelp" className="form-text"style={{color: "gray" }}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label"><h3>Password</h3></label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required style={{ backgroundColor: "#032c4d", color: "white" }} />
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label"><h3>Confirm Password</h3></label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required style={{ backgroundColor: "#032c4d", color: "white" }} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
