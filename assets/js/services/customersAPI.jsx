import axios from "axios";

function findAll()
{
    const result = axios.get("http://127.0.0.1:8000/api/clients")
        .then(response => response.data["hydra:member"]);

    return result;
}


function deleteCustomer(id)
{
    return axios.delete("http://127.0.0.1:8000/api/customers/"+id);
}

function findFirst(id)
{
    return axios.get("http://127.0.0.1:8000/api/customers/" + id)
        .then(response => response.data);
}


function update(id, customer)
{
    return axios.put('http://127.0.0.1:8000/api/customers/'+id, customer);
}

function create(customer)
{
    return axios.post('http://127.0.0.1:8000/api/customers', customer);;
}
export default {
    create:create,
    update: update,
    findFirst: findFirst,
    findAll: findAll,
    deleteCustomer: deleteCustomer
}