import axios from "axios";

function findAll(){
    return axios.get("http://127.0.0.1:8000/api/clients")
        .then(response => response.data['hydra:member']);
}


function deleteCustomer(id) {

}

export default {
    findAll: findAll,
    deleteCustomer: deleteCustomer
}