import axios from "axios";

function findAll(){
    const result = axios.get("http://127.0.0.1:8000/api/clients")
        .then(response => response.data['hydra:member']);

    return result;
}


function deleteCustomer(id) {

}

export default {
    findAll: findAll,
    deleteCustomer: deleteCustomer
}