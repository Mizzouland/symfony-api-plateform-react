import React, {useEffect, useState} from 'react';
import axios from "axios";

const CustomersPage =  (props) => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/clients")
            .then(response => response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response))
        ;
        // Je veux changer ce qu'il y dans data avec customers et comme j'appelle setCustomers, il me mets tous ca dans customers
    }, []);



    const handleDelete = id => {
        // 0 . on fait une copie du data avant la suppression
        const originalCustomers = [...customers];

        // 1 . l'approche optimiste : l'api dans tous les cas marche
        // supprimer de l'affichage, donc cela correspont à mon tableau moins l'id que j'ai supprimer
        setCustomers(customers.filter(customer => customer.id !== id));

        // 2 - l'approche pessimiste : opopop on appelle l'api et si la suppression s'est bien déroulé
        // alors on met à jour l'affichage
        // l'aspect pessimiste rogne sur l'aspect reactif
        axios.delete("http://127.0.0.1:8000/api/customers/" + id)
            .then(response => console.log('ok'))
            .catch(error => {
                // si cela n'a pas marché, je remet dans mon tableau le tableau original
                setCustomers(originalCustomers);

                console.log(error.response)

            });

    };

    return (
        <>
            <h1>Liste de clients</h1>
            <table className="table table-hover pt-3">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th>Action</th>

                    </tr>
                </thead>

                <tbody>
                {customers.map(customer =>


                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>
                            <a href="#">{customer.firstname} {customer.lastname}</a>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">
                            <span className="badge badge-success">{customer.invoices.length}</span>

                        </td>
                        <td className="text-center">
                            {customer.totalInvoices.toLocaleString()} euro
                        </td>
                        <td>
                            <a href="#" className="btn btn-primary btn-sm mr-2">Editer</a>
                            <button
                                onClick={ () => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-danger btn-sm">Supprimer</button>
                        </td>
                    </tr>
                )}
                </tbody>

            </table>
        </>

    );
};


export default CustomersPage;