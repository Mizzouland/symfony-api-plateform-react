import React , {useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from "axios";

const CustomerPage = (props) => {

    // 1 - si on donne un state et une value il faut automatiquement donner une propriété onChange
    const [customer, setCustomer] = useState({
        lastname : "",
        firstname : '',
        email: '',
        company: ''
    });

    const [errors, setErrors] = useState({
        lastName : "",
        firstName : '',
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
            // je vais attendre la réponse de axios avec une requete en post
            // et quant on envoie une requete en post nous ajoutons un objet qui sera customer
           const response =  await axios.post('http://127.0.0.1:8000/api/customers', customer);
           console.log(response)
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <>
            <h1>Création d'un client</h1>

            <form onSubmit={handleSubmit}>
                <Field name="lastname" label="Nom de famille" placeholder="Nom de famille du client"
                       value={customer.lastname} onChange={handleChange} error={errors.lastName}/>
                <Field name="firstname" label="Prénom" placeholder="Prénom du client"
                       value={customer.firstname} onChange={handleChange} error={errors.firstName}/>
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