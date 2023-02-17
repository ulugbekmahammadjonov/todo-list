import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TodoObj } from "../types";
import { CreateTodo, DeleteTodo, GetTodos } from "../utils/ToDosAPI";
import styled from "styled-components"
export const Todos = () => {
  const [signedIn, setSignedIn] = useState(true)
  const [todos, setTodos] = useState([] as TodoObj[])
  const [title, setTitle] = useState("")

  const handleLogout = () => {
    localStorage.removeItem("token")
    setSignedIn(false)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title !== "") {
      CreateTodo(title).then((res) => {
        if (res.status === 401) {
          setSignedIn(false)
        }
        setTodos([...todos, res.todo])
        setTitle("")
      })
    }
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    DeleteTodo(id)
  }

  useEffect(() => {
    if (signedIn) {
      GetTodos().then((res) => {
        if (res.status === 401) {
          setSignedIn(false)
        }
        setTodos(res.todos)
      })
    }
  }, [signedIn])

  return (
    <Wrapper>

      {
        signedIn
          ? (
            <div>

              <div>
                <h1>LIST</h1>
                <button onClick={handleLogout}>Logout</button>
              </div>
              <form onSubmit={handleAddTodo}>

                <input onChange={handleTitleChange} type="text" id="title" name="title" />
                <button type="submit">Add Todo</button>
              </form>
              <ul>
                {todos.map((todo) => (
                  <li key={todo.id}>
                    {todo.title} {" - "}
                    {/*{todo.completed ? "✅" : "❌"}*/}
                    <button onClick={() => handleDeleteTodo(todo.id)}>❌</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
            <div className="main-nav">
              <h1>LIST</h1>
              <div>
                <Link to={"/login"}>Login</Link>

                <Link to={"/signup"}>Sign Up</Link>
              </div>

              
            </div>
              <h1>hello welcome to your to do list</h1>
            </div>
          )
      }
    </Wrapper>
  )
}
const Wrapper = styled.div`
display:flex;
justify-content:center;
background:#0d263b;
height:80vh;
.main-nav{
  height:50px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  margin-top: 20px;
}

`