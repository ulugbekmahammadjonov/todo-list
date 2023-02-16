import axios from "axios";

const baseUrl = "https://todoapidrf.pythonanywhere.com/api"

export const GetTodos = () => {
  return axios.get(`${baseUrl}/todos/`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return {
      todos: res.data,
      status: res.status
    }
  }).catch(err => {
    return {
      todos: [],
      status: err.response.status
    }
  })
}

export const CreateTodo = (title: string) => {
  return axios.post(`${baseUrl}/todos/`, {title: title}, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return {
      todo: res.data,
      status: res.status
    }
  }).catch(err => {
    return {
      todo: [],
      status: err.response.status
    }
  })
}


export const DeleteTodo = (id: number) => {
  axios.delete(`${baseUrl}/todos/${id}/`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(() => {
    console.log("Deleted")
  }).catch(() => {
    console.log("Error deleting")
  })
}
