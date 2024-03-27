import { ChangeEvent, SyntheticEvent, useState } from "react"

const Login = () => {
  const [username,setUsername]=useState<string>("");
  const [password,setPassword]=useState<string>("");


  const handleSubmit=(e:SyntheticEvent)=>{
    e.preventDefault();
    console.log("Submitted");
  }

  return (
    <div>
      <div className="py-5 text-center ">
      <h2>Login to Continue!</h2>

      <form onSubmit={handleSubmit}>
        {/* <div> */}
            <label htmlFor="username"  className="form-label">Username</label>
            <input type="text" placeholder="Enter the username " className="form-control" value={username} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setUsername(e.target.value)}} />
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" placeholder="Enter the password " className="form-control" value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}} />
    <button type="submit" >Login</button>
          {/* </div> */}

      </form>
      </div>
    </div>
  )
}

export default Login
