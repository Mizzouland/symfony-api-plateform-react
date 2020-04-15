import React , {useState, useEffect} from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import customersAPI from "../services/customersAPI";
import axios from "axios";
const InvoicePage = ({history}) => {

    // PARTIE 1 - CREATION D'UN STATE
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });
    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    // PARTIE 2 - GESTION DES CHANGEMENTS DES INPUTS DANS LE FORMULAIRE
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        // Elle modifiera mon customer et je vais écraser la propriété
        setInvoice({...invoice, [name]: value});
    };

    // PARTIE 3 - GESTION et CREATION DU COMPOSANT SELECT

    // PARTIE 4 - CREATION D'UN STATE
    const [customers, setCustomers] = useState([]);

    // PARTIE 4-1 - APPEL DES CUSTOMERS AVEC AFFECTATION DES DATA AU STATE CUSTOMERS
    const fetchCustomers = async () => {

        try {
            const data =  await customersAPI.findAll();
            console.log(data);
            setCustomers(data);

            // PARTIE 6-1 - CUSTOMER
            if(!invoice.customer) {
                setInvoice({...invoice, customer: data[0].id})
            }
        } catch (error) {
            console.log(error.response);

        }
    };
    // PARTIE 4-2 - ON MAP TOUS LES CUSTOMERS DANS LE SELECT DES CUSTOMER et on lance le fetchCustomer dans le UseEffect

    // PARTIE 5 - UTILISATION D'UN USE EFFECT
    useEffect(() => {
        fetchCustomers();
    }, []);


    // PARTIE 6 - UNE FOIS NOTRE STRUCTURE POSE NOUS ALLONS SOUMMETTRE NOTRE FORMULAIRE
    const handleSubmit =  async (event) => {
       event.preventDefault();
       console.log(invoice);

            // copie de l'invoice {...invoice
            // dans lequel on écrase customer

           const response = await axios.post("http://127.0.0.1:8000/api/invoices",
               {...invoice, customer:`/api/customers/${invoice.customer}`

               });
           // TODO FLASH NOTIFICATION
            history.replace("/invoices");
           console.log(response);
       try {

       } catch (error) {
           console.log(error.response);
       }
    };

    return (
        <>
            <h1>Création d'une facture</h1>

            <form onSubmit={handleSubmit}>
                <Field name="amount" label="Montant" placeholder="Montant de la facture" type="number"
                       value={invoice.amount} onChange={handleChange} error = {errors.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.firstname} {customer.lastname}
                        </option>
                    ))}
                </Select>

                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>


                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>

                <Link to="/invoices" className="btn btn-link">Retour aux factures</Link>
            </form>
        </>
    )
};

export default InvoicePage;