import * as Axios from 'axios';

const tetrisToken = localStorage.getItem('tetrisToken');
const axios = Axios.create({
  baseURL: 'http://127.0.0.1:3004/api/',
  headers: {'Authorization': "Bearer " + tetrisToken},
})


export const startGame = () => axios({
  method: 'post',
  url: 'start',
}).catch(err => err);