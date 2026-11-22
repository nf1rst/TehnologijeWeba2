import axios from "axios";
import { ApiService } from "./ApiService";


//https://medium.com/@aditya.sawant122/creating-a-modular-http-service-in-react-step-by-step-guide-9b8d88747678
class PatientService extends ApiService{
  constructor(){
    super('/patients')
  }
}

export const patientHttp=new PatientService();