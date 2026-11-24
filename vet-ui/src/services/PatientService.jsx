import axios from "axios";
import { ApiService } from "./ApiService";


//https://medium.com/@aditya.sawant122/creating-a-modular-http-service-in-react-step-by-step-guide-9b8d88747678
class PatientService extends ApiService{
  constructor(){
    super('/patients')
  }

  async update(id, params={}){
    const response = await this.instance.patch(`/${id}`, params)
    return response.data;
  }

  async insert(params={}){
    var response = await this.instance.post('', params)
    return response.data;
  }

  async getById(id){
    var response = await this.instance.get(`/${id}`)
    return response.data;
  }
}

export const patientHttp=new PatientService();