import axios from "axios";

import {INVOICES_API} from "../config";


function findFirst(id) {
    return axios.get(INVOICES_API+id)
        .then(response => response.data);
}

function update(id, data) {
    return axios.put(INVOICES_API+id,
        {...data, customer: `/api/customers/${data.customer}`}
    );
}

function create(data) {
    return axios.post(INVOICES_API,
        {...data, customer:`/api/customers/${data.customer}`}
        );
}

export default {
    findFirst,
    update
}