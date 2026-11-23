import axios from 'axios';

export class ApiService {
  constructor(endpoint) {
    this.instance = axios.create({
      baseURL: `http://localhost:4200${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  //attach authorization header to every request - https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
    axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    config.headers.Authozitation = token
    return config;
  });
  }
  
    async getAll(params={}){
        const response = await this.instance.get('/', {params});
        return response.data;
    }

}