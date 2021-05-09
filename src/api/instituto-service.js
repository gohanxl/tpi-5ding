import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

export const institutosService = {
  getInstitutos: (auth_token) => axios.get(`${url}/Institutos`, {Headers: {'Authorization': auth_token}}),
}