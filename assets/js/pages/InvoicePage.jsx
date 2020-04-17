import React , {useState, useEffect} from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import customersAPI from "../services/customersAPI";
import invoicesAPI from "../services/invoicesAPI";
import axios from "axios";
const InvoicePage = ({history, match}) => {

    // PARTIE 7-1 - DESTRUCTURATION DE L'id passé en paramètre que l'on sort de params
    // PARTIE 7-2 - ENSUITE ON UTILISER UN EFFECT POUR DESCRIMINER CE QUE L'ON VEUT FAIRE

    const { id = "create" } = match.params;

    // PARTIE 8 - DETERMINATION DU MODE EDITION OU CREATION et par défaut nous sommes en mode création
    const [editing, setEditing] = useState(false);



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
            // console.log(data);
            setCustomers(data);

            // PARTIE 6-1 - CUSTOMER
            if(!invoice.customer) {
                setInvoice({...invoice, customer: data[0].id})
            }
        } catch (error) {
            console.log(error.response);

        }
    };

    const fetchInvoice = async id => {
        try {
            console.log('fetchinvoice');
            console.log(id);
            // ON EXTRAIT LA DATA DE RESPONSE
            // const data = await axios.get("http://127.0.0.1:8000/api/invoices/"+id)
            //    .then(response => response.data);
            const data = await invoicesAPI.findFirst(id);

            console.log(data);
            const {amount, status, customer} = data;

            console.log({amount, status, customer:customer.id});
            setInvoice({amount, status, customer:customer.id});
            // setInvoice(data);

        } catch (error) {
            history.replace('/invoices');
        }
    }



    // PARTIE 4-2 - ON MAP TOUS LES CUSTOMERS DANS LE SELECT DES CUSTOMER et on lance le fetchCustomer dans le UseEffect

    // PARTIE 5 - UTILISATION D'UN USE EFFECT
    // récupération de la liste des cliens à chaque chargement du composant
    useEffect(() => {
        fetchCustomers();
    }, []);

    // PARTIE 7-3 - ENSUITE ON UTILISER UN EFFECT POUR DESCRIMINER CE QUE L'ON VEUT FAIRE
    // CE USEEFFECT DEPENT DE LA VARIABLE id
    // C'est a dire que si la variable id, change, ce second effet sera rappelé
    // récupération de la bonne facture quant l'identifiant de l'url change
    useEffect(() => {
        // Fonction qui va chercher une facture
        if (id !== 'create') {
            // PARTIE 8 - 1 SI ON EST EN MODE EDITION ON PASSE LE EDITING A TRUE
            setEditing(true);
            fetchInvoice(id);

        }
    }, [id]);

    // PARTIE 6 - UNE FOIS NOTRE STRUCTURE POSE NOUS ALLONS SOUMMETTRE NOTRE FORMULAIRE
    const handleSubmit =  async (event) => {
       event.preventDefault();
       console.log(invoice);


       try {


           // copie de l'invoice {...invoice
           // dans lequel on écrase customer

           if (editing) {
               // ON FAIT DU PUT POUR LA MISE A JOUR
               const response = axios.put("http://127.0.0.1:8000/api/invoices/"+id,
                   {
                       ...invoice, customer: `/api/customers/${invoice.customer}`
                   });
               console.log(response);

               // TODO FLASH NOTIFICATION
               history.replace("/invoices");
           } else {
               // ON FAIT DU POST
               const response = await axios.post("http://127.0.0.1:8000/api/invoices",
                   {...invoice, customer:`/api/customers/${invoice.customer}`

                   });
               // TODO FLASH NOTIFICATION
               history.replace("/invoices");
           }



           // console.log(response);
           setErrors({});
       } catch (error) {
           const violations = error.response.data.violations;
           const apiErrors = {};
           if(error.response.data.violations){
               error.response.data.violations.forEach(violation => {
                   apiErrors[violation.propertyPath] = violation.message
               })
           }
           setErrors(apiErrors);
           // TODO : FLASH DE NOTIFICATION DES ERREURES

       }
    };

    return (
        <>
            {editing && <h1>Modification du client</h1> || <h1>Création d'une facture</h1>}

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