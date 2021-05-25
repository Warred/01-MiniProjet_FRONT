/* import axios from "axios"


const apiMovie = axios.create({
    baseURL: 'https://api.themoviedb.org/4'
})
export default apiMovie

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmJlMTY2MTRmMTFiOGM0OTBmNjczMzNhMDk4ZDM2MSIsInN1YiI6IjVkN2Y4YzcxZjA2NDdjNzYyOTlkOTA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.50EI4M3V9ztGkVfmAU1Nibko3b0zbH3afImUMgJS0DA'

apiMovie.interceptors.request.use((request) => {
    request.headers['Authorization'] = 'Bearer ' + token
    return request
}) */