import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

import customersAPI from "../services/customersAPI";

const CustomersPage =  (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');


    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.findAll();
            setCustomers(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    // on récupere un effet qui ne depend d'aucune donnée

    useEffect( () => {

        fetchCustomers();

        /**

         customersAPI.findAll()
         .then(data => setCustomers(data))
         .catch(error => console.log(error.response));

         */


        // Je veux changer ce qu'il y dans data avec customers et comme j'appelle setCustomers, il me mets tous ca dans customers
    }, []);



    const handleDelete = async id => {
        // 0 . on fait une copie du data avant la suppression
        const originalCustomers = [...customers];

        // 1 . l'approche optimiste : l'api dans tous les cas marche
        // supprimer de l'affichage, donc cela correspont à mon tableau moins l'id que j'ai supprimer
        // cela correpond à un tableau des customer sauf celui que j'ai supprimer
        setCustomers(customers.filter(customer => customer.id !== id));

        // 2 - l'approche pessimiste : opopop on appelle l'api et si la suppression s'est bien déroulé
        // alors on met à jour l'affichage
        // l'aspect pessimiste rogne sur l'aspect reactif

        /**
         axios.delete("http://127.0.0.1:8000/api/customers/" + id)
         .then(response => console.log('ok'))
         .catch(error => {
                // si cela n'a pas marché, je remet dans mon tableau le tableau original
                setCustomers(originalCustomers);

                console.log(error.response)

         });
         */


        // deux version de promesse
        try {
            await axios.delete("http://127.0.0.1:8000/api/customers/" + id);
        } catch (error) {
            // si cela n'a pas marché, je remet dans mon tableau le tableau original
            setCustomers(originalCustomers);

            console.log(error.response)
        }
    };

    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);

    };


    // fonction qui recoit une page que l'on souhaite afficher
    const handleChangePage = (page) => {
        // je vais changer mon currentPage à page
        setCurrentPage(page);
    };

    const itemPerPage = 15;

    // je veux garder mes customers que j'ai filtrer par le nom en minuscule
    // inclue ma recherche que je passe aussi en lowerCase
    // ou soit le lastname
    const filteredCustomers = customers.filter(
        c => c.firstname.toLowerCase().includes(search.toLowerCase())
            ||
            c.lastname.toLowerCase().includes(search.toLowerCase())
            ||
            c.email.toLowerCase().includes(search.toLowerCase())
            ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    );
    // donc maintenant pour la recherche au lieu d'avoir des curstomers qui sont paginé
    // je voudrais paginer mes customers qui correspondent à ma recherce


    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemPerPage);
    // const paginatedCustomers = filteredCustomers.length > itemPerPage ? Pagination.getData(filteredCustomers, currentPage, itemPerPage) : filteredCustomers;


    // const paginatedCustomers = Pagination.getData(customers, currentPage, itemPerPage);

    // donc au lieu de bouclé sur la customers on va bouclé sur paginatedCustomers

    return (
        <>
            <h1>Liste de clients</h1>

            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher ... " value={search} onChange={handleSearch}/>
            </div>

            <div className="card mt-4">
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
                    {paginatedCustomers.map(customer =>


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


                {itemPerPage < filteredCustomers.length &&
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemPerPage}
                    length={filteredCustomers.length}
                    onPageChanged={handleChangePage}
                />
                }

            </div>

        </>

    );
};


export default CustomersPage;