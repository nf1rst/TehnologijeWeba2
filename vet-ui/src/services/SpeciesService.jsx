import { ApiService } from "./ApiService";

class SpeciesService extends ApiService{
    constructor(){
        super('/species')
    }
}

export const speciesHttp= new SpeciesService();