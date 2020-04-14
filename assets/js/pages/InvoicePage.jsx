import React , {useState} from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";

const InvoicePage = props => {

    // PARTIE 1 - CREATION D'UN STATE
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: ""
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

    return (
        <>
            <h1>Création d'une facture</h1>

            <form>
                <Field name="amount" label="Montant" placeholder="Montant de la facture" type="number"
                       value={invoice.amount} onChange={handleChange} error = {errors.amount}
                />

                <Select name="customer" label="Clients" value={invoice.customer} error={errors.customer}
                    onchange={handleChange}
                >
                    <option value="1">Stéphane</option>

                </Select>

                <Select name="status" label="Statut" value={invoice.status} error={errors.status}
                    onchange={handleChange}
                >
                    <option value="SENT">Envoyé</option>
                    <option value="PAID">Payé</option>
                    <option value="CANCELLED">Annulé</option>

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