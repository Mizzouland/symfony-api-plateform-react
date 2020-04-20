import axios from "axios";
import Cache from "./cache";
import {CUSTOMER_API, CUSTOMER_API_2} from "../config";

async function findAll()
{
    const cachedCustomers = await Cache.get("customers");
    if (cachedCustomers != null) {
        return cachedCustomers;
    } else {
        const result = axios.get(CUSTOMER_API_2)
            .then(response =>{
                const customers =  response.data["hydra:member"];
                Cache.set("customers", customers);
                return customers;
            });

        return result;
    }
}


function deleteCustomer(id)
{
    //  QUANT IL Y A UNE SUPPRESSION
    // EN REALITE QUANT ON VA RECEVOIR LA REPONSE QUI NOUS DIT QUE CELA A ETE SUPPRIME
    // ON VA BIEN SUR LE SUPPRIMER DU CACHE

    return axios.delete(CUSTOMER_API+"/"+id)
        .then(async response => {
            const cachedCustomers = await Cache.get("customers");
            if (cachedCustomers != null) {
                Cache.set("customers", cachedCustomers.filter(c => c.id !== id));
            }
            return response
        });
}

async function findFirst(id)
{
    const cachedCustomer = await Cache.get("customers."+id);

    if (cachedCustomer) {
        return cachedCustomer;
    } else {
        return axios.get(CUSTOMER_API+"/"+id)
            .then(response => {
                const customer = response.data;
                Cache.set("customers."+id, customer);
                return customer;
            });
    }

}


function update(id, customer)
{
    return axios.put(CUSTOMER_API+"/"+id, customer)
        .then( async response => {
            const cachedCustomers = await Cache.get("customers");
            const cachedCustomer = await Cache.get("customers."+id);

            if (cachedCustomer) {
                Cache.set("customers."+id, response.data);
            }


            if (cachedCustomers != null) {

                //  JE VAIS RECEHRCHE L'INDEX DU CUSTOMER DE CELUI QUE JE SUIS EN TRAIN DE MODIFIER
                // jE VAIS AVOIR L'INDEX DU CUSTOMER QUE JE SUIS EN TRAIN DE MOFIDIER
                const index = cachedCustomers.findIndex( c => c.id === +id);

                const newCachedCustomer = response.data;
                // DANS MON CACHEDcUSTOMERS, JE VAIS REMPLACER DANS L'INDEX MON NOUVEAU CUSTOMERS
                cachedCustomers[index] = newCachedCustomer;

                Cache.set("customers", cachedCustomers);
            }
            return response;
        });
}

function create(customer)
{
    return axios.post(CUSTOMER_API, customer)
        .then(async response => {
            const cachedCustomers = await Cache.get("customers");
            if (cachedCustomers != null) {
                Cache.set("customers", [...cachedCustomers, response.data]);
            }
            return response;
        });
}
export default {
    create:create,
    update: update,
    findFirst: findFirst,
    findAll: findAll,
    deleteCustomer: deleteCustomer
}