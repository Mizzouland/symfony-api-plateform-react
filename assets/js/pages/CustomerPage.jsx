import React , {useState, useEffect} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from "axios";
import customersAPI from "../services/customersAPI";
import { toast}  from "react-toastify";


const CustomerPage = (props) => {

    console.log(props);
    // ON SORT L'IDENTIFIANT DES PARAMS AFIN DE DETERMINER SI NOUS SOMMES EN MODE EDITION OU CREATION
    const {id = "create"} = props.match.params;


    // ON VA ENSUITE CRER UN STATE QUI VA PERMETTRE DE DISCRIMER SI JE SUIS EN MODE EDIT OU CREATE
    // ET PAR DEFAUT NOUS NE SOMMES PAS EN TRAIN D'EDITER
    const [editing, setEditing] = useState(false);
    // je vais recevoir une réponse que je vais extraire de response.data


    // Récupération du customer en fonction de l'identifiant
    const fetchCustomer = async id => {

        try {
            const data = await customersAPI.findFirst(id);

            // on destructurise la constante data renvoyé par l'api
            const {firstname, lastname, email, company} = data;
            setCustomer({firstname, lastname, email, company});

        } catch (error) {
            console.log(error.response);
            // TODO : Notification flash d'une erreure
            toast.error("Le client n'a pas être chargé !");

            props.history.replace("/customers");
        }
    };

    // ON effectue un useEffect a chaque fois que la variable id va changer
    // Chargement du customer si besoin au chargement du composant ou au chargement de l'identifiant
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

    // GESTION DES CHANGEMENTS DES INPUTS DANS LE FORMULAIRE
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


    //  GESTION DE LA SOUMMISION DU FORMULAIRE
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setErrors({});
            if (editing) {
                const response =  await customersAPI.update(id, customer);
                console.log(response.data);
                // TODO : FLASH DE NOTIFICATION DE SUCCES
                toast.success("Le client à bien été modifié !");


            } else {
                // je vais attendre la réponse de axios avec une requete en post
                // et quant on envoie une requete en post nous ajoutons un objet qui sera customer
                const response =  await customersAPI.create(customer);
                toast.success("Le client à bien été crée !");

                // TODO : FLASH DE NOTIFICATION DE SUCCES
                props.history.replace("/customers")
            }



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
            toast.error("Des erreures dans votre formulaire");

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