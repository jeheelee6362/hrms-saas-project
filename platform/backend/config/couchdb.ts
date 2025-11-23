import axios from 'axios';
import { URI } from './index'
import async from 'async'
//
const couchdb = axios.create({
  baseURL: URI,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000
});
//
function createDatabase(db:string) {
    couchdb.put(db).then(response => {
        console.info(response.data);
      }).catch(err => {
        console.error("DB "+db+" already exists");
      });
}

export {
    couchdb,
}