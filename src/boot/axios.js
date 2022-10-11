import { boot } from 'quasar/wrappers'
import axios from 'axios'

const url = 'http://localhost:3000';
const baseURL = `${url}`;

const API = axios.create({
  baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Accept": "application/json",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "Set-Cookie": "SameSite=None;"
  }
});

export default {
  url,
  getAllPoints(){
    return API.get('points/getAllPoints')
  },
  sendRating(object){
    return API.post('answers', object);
  },
  getAllAnswers(){
    return API.get('answers')
  },
  getAnswerByPointId(id){
    return API.get(`answers/getAnswersById/${id}`)
  }
}
