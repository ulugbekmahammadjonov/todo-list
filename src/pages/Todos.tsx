import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {TodoObj} from "../types";
import {CreateTodo, DeleteTodo, GetTodos} from "../utils/ToDosAPI";

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
    <>
      {
        signedIn
          ? (
            <div>
              <h1>Todos</h1>
              <button onClick={handleLogout}>Logout</button>
              <form onSubmit={handleAddTodo}>
                <label htmlFor="title">Title</label>
                <input onChange={handleTitleChange} type="text" id="title" name="title"/>
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
              <Link to={"/login"}>Login</Link>
              <br/>
              <Link to={"/signup"}>Sign Up</Link>
            </div>
          )
      }
    </>
  )
}