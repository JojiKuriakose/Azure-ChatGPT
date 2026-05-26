import axios from 'axios';
import type { Mode } from '../types';

console.log(window.location.host);

const API_ADDRESS = window.location.host=="localhost:5173" 
? "http://localhost:8000/api" : "https://cldgptwebapi-a4hsftctg4h7bfgs.canadacentral-01.azurewebsites.net/api";

export const sendMessage = async (question: string, mode: Mode) => {
    if (mode=="custom"){
        const response = await axios.post(`${API_ADDRESS}/azure/custom`, { question, mode });
        return response.data;
    }
    else if (mode=="image"){
        const response = await axios.post(`${API_ADDRESS}/azure/image`, { question, mode });
        return response.data;
    }
    else{
        const response = await axios.post(`${API_ADDRESS}/azure/global`, { question, mode });
        return response.data;
    }
}