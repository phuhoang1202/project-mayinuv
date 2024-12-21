// src/api.js
import axios from 'axios'
import config from '../config'
import { constants as c } from '../constants'
import { getToken } from '../utils/auth'
// import { DeviceUUID } from "device-uuid";
// const uuid = new DeviceUUID().get();

// PhucTD config call api for others cases
const exceptPrefix = ['/login', '/register']
const checkEndPoint = (endpoint) => {
  for (const prefix of exceptPrefix) {
    if (endpoint.includes(prefix)) {
      return true
    }
  }
  return false
}

export const callApi = (endPoint, method, body) => {
  if (checkEndPoint(endPoint) === false) {
    axios.interceptors.request.use(
      (config) => {
        const token = getToken()
        const language = JSON.parse(localStorage.getItem('language')) || 'ko'
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        config.headers['Accept-Language'] = language
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
    axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error?.response?.data?.code === 404) {
          // window.location.replace("/khong-tim-thay-trang");
        } else if (error?.response?.data?.code === 401) {
          // removeToken();
          // history.push("/login")
        }
        return Promise.reject(error)
      },
    )
  }
  return axios({
    method,
    url: `${c.API_URL}${endPoint}`,
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': JSON.parse(localStorage.getItem('language')) || 'ko',
    },
  })
}

export const callApiImage = (endPoint, method, body) => {
  if (checkEndPoint(endPoint) === false) {
    axios.interceptors.request.use(
      (config) => {
        const token = getToken()
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
    axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error?.response?.data?.code === 404) {
          // window.location.replace("/khong-tim-thay-trang");
        } else if (error?.response?.data?.code === 401) {
          // removeToken();
          // history.push("/login")
        }
        return Promise.reject(error)
      },
    )
  }
  return axios({
    method,
    url: `${c.API_URL}${endPoint}`,
    data: body,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const callApiNoAuthen = (endPoint, method, body, contentType, authorization) => {
  return axios({
    method,
    url: `${c.API_URL}${endPoint}`,
    data: body,
    headers: {
      'Content-Type': `${contentType ? contentType : 'application/json'}`,
      'Accept-Language': JSON.parse(localStorage.getItem('language')) || 'ko',
      ...(authorization && { Authorization: authorization }),
    },
  })
}

export const callApiTranslate = (endPoint, method, body) => {
  return axios({
    method,
    url: `${endPoint}`,
    data: body,
    Authorization: '',
  })
}

export const callApiUploadAvatar = (endPoint, method, body, authorization) => {
  return axios({
    method,
    url: `${c.API_URL}${endPoint}`,
    data: body,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(authorization && { Authorization: authorization }),
    },
  })
}

export const callApiAuthen = (endPoint, method, body) => {
  const authorization = `Bearer ${getToken()}`
  return axios({
    method,
    url: `${c.API_URL}${endPoint}`,
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': JSON.parse(localStorage.getItem('language')) || 'ko',
      Authorization: authorization,
    },
  })
}

export const callApiLogin = (endPoint, method, body, contentType, authorization) => {
  return axios({
    method,
    url: `${c.API_URL}${endPoint}`,
    data: body,
    headers: {
      'Content-Type': `${contentType ? contentType : 'application/json'}`,
      Authorization: `Basic ${btoa(`${c.LOGIN_CLIENTID}:${c.LOGIN_CLIENTSECRET}`)}`,
    },
  })
}
