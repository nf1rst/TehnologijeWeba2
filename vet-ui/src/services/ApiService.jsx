import axios from 'axios';

export class ApiService {
  constructor(endpoint) {
    this.instance = axios.create({
      baseURL: `http://localhost:4200${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

    async getAll(params={}){
        const response = await this.instance.get('/', {params});
        return response.data;
    }

}