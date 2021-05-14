import axios from 'axios';
import {API_GATEWAY_VERSION} from '../config'

export const checkFields = (...args) => {
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '' || args[i] === null || args[i] == undefined) {
            return false;
        }
    }
    return true;
};

export const fetchDataFromAPI = async (url, data,auth="") => {
    try {
        return await axios({
            method: "post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":auth
            },
            data,
            url: API_GATEWAY_VERSION + url
        }).then((response) => {
            return response.data;
        }).catch((e) => {
            return e.response.data;
        });
    } catch (e) {
        console.log(e);
        return e.message;
    }
}