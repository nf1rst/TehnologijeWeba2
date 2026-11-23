import axios from "axios";
import { ApiService } from "./ApiService";

class LoginService extends ApiService{
    constructor(){
        super('/login')
    }

    async login(payload){
        var response = await this.instance.post('', payload)
        return response.data;
    }

}

export const loginHttp = new LoginService()