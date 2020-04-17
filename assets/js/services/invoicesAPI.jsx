import axios from "axios";



function findFirst(id) {
    return axios.get("http://127.0.0.1:8000/api/invoices/"+id)
        .then(response => response.data);
}

function update(id, data) {
    return axios.put("http://127.0.0.1:8000/api/invoices/"+id,
        {...data, customer: `/api/customers/${data.customer}`}
    );
}

function create(data) {
    return axios.post("http://127.0.0.1:8000/api/invoices",
        {...data, customer:`/api/customers/${data.customer}`}
        );
}

export default {
    findFirst,
    update
}