import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {RegisterUser} from "../utils/UserAPI";

export const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
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

    RegisterUser(userData).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.token)
        navigate("/")
      } else {
        setError(res.token)
      }
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Register user</h1>
      {error && <p>{error}</p>}
      <label htmlFor={"first_name"}>First Name</label>
      <input onChange={handleChange} type={"text"} id={"first_name"}/>
      <label htmlFor={"last_name"}>Last Name</label>
      <input onChange={handleChange} type={"text"} id={"last_name"}/>
      <label htmlFor={"username"}>Username</label>
      <input onChange={handleChange} type={"text"} id={"username"}/>
      <label htmlFor={"password"}>Password</label>
      <input onChange={handleChange} type={"password"} id={"password"}/>
      <button type={"submit"}>Sign Up</button>
    </form>
  );
}