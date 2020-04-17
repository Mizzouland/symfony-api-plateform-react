import React, {useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from 'axios';


const RegisterPage = (props) => {
    // STEP 1 - Création de l'utilisateur
    const [user, setUser] = useState({
        firstsame: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    // STEP 2 - Création des erreures
    const [errors, setErrors] = useState({
        firstsame: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });


    // STEP 3 - GESTION DES CHANGEMENTS DES INPUTS DANS LE FORMULAIRE
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        // Elle modifiera mon customer et je vais écraser la propriété
        setUser({...user, [name]: value});
    };

    // STEP 4 - SOUMISSION DU FORMULAIRE AVEC GESTION DES ERREURS
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(user);
        
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/users", user);
          console.log(response);
        } catch (error) {
            const {violations} = error.response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    }


    // STEP 5 - CREATION DU FORMULAIRE
    return (
        <>
            <h1>Création de compte</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstname"
                    label="Prénom"
                    placeholder="Votre prénom" type="text"
                    error={errors.firstname}
                    value={user.firstname}
                    onChange={handleChange}
                />
                <Field
                    name="lastname"
                    label="Nom"
                    placeholder="Votre nom de famille" type="text"
                    error={errors.lastname}
                    value={user.lastname}
                    onChange={handleChange}
                />
                <Field
                    name="email"
                    label="Email"
                    placeholder="Votre email" type="email"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    placeholder="Votre mot de passe" type="password"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field
                    name="passwordConfirm"
                    label="Mot de passe"
                    placeholder="Confirmer votre mot de passe" type="password"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Confirmation</button>
                </div>

                <Link to="/login" className="btn btn-primary">J'ai déjà un compte</Link>
            </form>
        </>
    );
}

export default RegisterPage;