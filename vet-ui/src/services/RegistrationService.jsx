import { ApiService } from "./ApiService";

class RegistrationService extends ApiService{
    constructor(){
        super("/register")
    }

    async register(payload){
        //sent in the body, not in the query string 
        var response = await this.instance.post('',payload);
        return response.data;
    }
}

export const registrationHttp = new RegistrationService();