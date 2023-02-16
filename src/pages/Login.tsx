import React, {useState} from "react";
import {LoginUser} from "../utils/UserAPI";
import {useNavigate} from "react-router-dom";


export const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })

  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    LoginUser(userData).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.token)
        navigate("/")
      }
      else {
        setError(res.token)
      }
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <label htmlFor={"username"}>Username</label>
      <input onChange={handleChange} type={"text"} id={"username"}/>
      <label htmlFor={"password"}>Password</label>
      <input onChange={handleChange} type={"password"} id={"password"}/>
      <button type={"submit"}>Login</button>
    </form>
  );
}