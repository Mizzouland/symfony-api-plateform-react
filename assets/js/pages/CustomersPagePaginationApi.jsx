import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";

const CustomersPagePaginationApi =  (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemPerPage = 15;

    // on récupere un effet qui ne depend d'aucune donnée
    // mais maintenant on va l'associer à currentPage
    // c'est a dire qu'il faudra appeler cette fonction a chaque fois que currentPage change
    // on va utiliser les backtips pluto que les guillement touche altgr F7 cela nous permet d'integrer plus facilement
    // des variables javascript
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/clients?pagination=true&count=${itemPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data['hydra:member']);
                setTotalItems(response.data['hydra:totalItems']);
                setLoading(false);
            })
            .catch(error => console.log(error.response))
        ;
        // Je veux changer ce qu'il y dans data avec customers et comme j'appelle setCustomers, il me mets tous ca dans customers
    }, [currentPage]);



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

    // fonction qui recoit une page que l'on souhaite afficher
    const handleChangePage = (page) => {
        setLoading(true);
        // je vais changer mon currentPage à page
        setCurrentPage(page);
    };


    // on a plus besoin de mapper sur les pagintedCustomers, mais uniquement sur les customers que l'on recoix
    const paginatedCustomers = Pagination.getData(customers, currentPage, itemPerPage);

    // donc au lieu de bouclé sur la customers on va bouclé sur paginatedCustomers

    return (
        <>
            <h1>Liste de clients paginations</h1>

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
                    {loading && (
                        <tr>
                            <td>Chargement...</td>
                        </tr>
                    )}


                    {
                        /** Si je ne fais pas le loading alors je fais le custommer map **/

                        !loading && customers.map(customer =>


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

                <Pagination

                    currentPage={currentPage}
                    itemsPerPage={itemPerPage}
                    length={totalItems}
                    onPageChanged={handleChangePage}
                />

            </div>

        </>

    );
};


export default CustomersPagePaginationApi;