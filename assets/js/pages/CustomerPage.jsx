import React , {useState, useEffect} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from "axios";

const CustomerPage = (props) => {

    console.log(props);
    // ON SORT L'IDENTIFIANT DES PARAMS AFIN DE DETERMINER SI NOUS SOMMES EN MODE EDITION OU CREATION
    const {id = "create"} = props.match.params;


    // ON VA ENSUITE CRER UN STATE QUI VA PERMETTRE DE DISCRIMER SI JE SUIS EN MODE EDIT OU CREATE
    // ET PAR DEFAUT NOUS NE SOMMES PAS EN TRAIN D'EDITER
    const [editing, setEditing] = useState(false);
    // je vais recevoir une réponse que je vais extraire de response.data
    const fetchCustomer = async id => {

        try {
            const data = await axios
                .get("http://127.0.0.1:8000/api/customers/" + id)
                .then(response => response.data);

            const {firstname, lastname, email, company} = data;
            setCustomer({firstname, lastname, email, company});
        } catch (error) {
            console.log(error.response);
        }
    };

    // ON effectue un useEffect a chaque fois que la variable id va changer
    useEffect(() => {
        if (id !== 'create') {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);



    // 1 - si on donne un state et une value il faut automatiquement donner une propriété onChange
    const [customer, setCustomer] = useState({
        lastname : "",
        firstname : '',
        email: '',
        company: ''
    });

    const [errors, setErrors] = useState({
        lastname : "",
        firstname : '',
        email: '',
        company: ''
    });

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        // Elle modifiera mon customer et je vais écraser la propriété
        setCustomer({...customer, [name]: value})
    };

    // Deuxieme possibilité d'écriture en destructurant l'event
    /**
     const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value})

     };
     */


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                const response =  await axios.put('http://127.0.0.1:8000/api/customers/'+id, customer);
                console.log(response.data);
                // TODO : FLASH DE NOTIFICATION DE SUCCES

            } else {
                // je vais attendre la réponse de axios avec une requete en post
                // et quant on envoie une requete en post nous ajoutons un objet qui sera customer
                const response =  await axios.post('http://127.0.0.1:8000/api/customers', customer);

                // TODO : FLASH DE NOTIFICATION DE SUCCES
                props.history.replace("/customers")
            }


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

    // si je ne suis pas en mode édition alors je suis en création
    return (
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Edition d'un client</h1>}

            <form onSubmit={handleSubmit}>
                <Field name="lastname" label="Nom de famille" placeholder="Nom de famille du client"
                       value={customer.lastname} onChange={handleChange} error={errors.lastname}/>
                <Field name="firstname" label="Prénom" placeholder="Prénom du client"
                       value={customer.firstname} onChange={handleChange} error={errors.firstname}/>
                <Field name="email" label="Email" placeholder="Email du client" type="email"
                       value={customer.email}  onChange={handleChange} error={errors.email}/>
                <Field name="company" label="Entreprise" placeholder="Entreprise du client" type="text"
                       value={customer.company}  onChange={handleChange} error={errors.company}/>

                <div className="form-group">
                    <button type="submit" className="btn btn-success mr-3">Enregistrer</button>
                    <Link to="/customers" className="btn btn-primary">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
};

export default CustomerPage;