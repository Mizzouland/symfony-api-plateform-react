import React , {useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";

const CustomerPage = (props) => {

    // 1 - si on donne un state et une value il faut automatiquement donner une propriété onChange
    const [customer, setCustomer] = useState({
        lastName : "Stephane",
        firstName : 'PRAUD',
        email: 'stephanepraud@hotmail.fr',
        company: 'Police Nationale'
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

    return (
        <>
            <h1>Création d'un client</h1>

            <form>
                <Field name="lastName" label="Nom de famille" placeholder="Nom de famille du client"
                       value={customer.lastName} onChange={handleChange}/>
                <Field name="firstName" label="Prénom" placeholder="Prénom du client"
                       value={customer.firstName} onChange={handleChange}/>
                <Field name="email" label="Email" placeholder="Email du client" type="email"
                       value={customer.email}  onChange={handleChange}/>
                <Field name="company" label="Entreprise" placeholder="Entreprise du client" type="text"
                       value={customer.company}  onChange={handleChange}/>

                <div className="form-group">
                    <button type="submit" className="btn btn-success mr-3">Enregistrer</button>
                    <Link to="/customers" className="btn btn-primary">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
};

export default CustomerPage;