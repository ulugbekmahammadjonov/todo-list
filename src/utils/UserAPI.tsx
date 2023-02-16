import axios from "axios";
import {userLoginObj, userRegisterObj} from "../types";

const baseUrl = "https://todoapidrf.pythonanywhere.com/api"

export const LoginUser = (userData: userLoginObj) => {
  return axios.post(`${baseUrl}/auth/login/`, userData).then(res => {
    return {
      token: res.data.token,
      status: res.status
    }
  }).catch(err => {
    return {
      token: err.response.data.error,
      status: err.response.status
    }
  })
}

export const RegisterUser = (userData: userRegisterObj) => {
  return axios.post(`${baseUrl}/auth/register/`, userData).then(res => {
    return {
      token: res.data.token,
      status: res.status
    }
  }).catch(err => {
    return {
      token: err.response.data.error,
      status: err.response.status
    }
  })
}