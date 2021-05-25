import axios from "axios"

const apiBack = axios.create({
    baseURL: 'http://localhost:8080/api/'
})
export default apiBack

const token = localStorage.getItem('token') ? localStorage.getItem('token') : false
if (token) {
    apiBack.interceptors.request.use( (request) => {
        request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        return request
    })
}