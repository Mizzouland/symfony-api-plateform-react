import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";
import moment from "moment";
import {Link} from "react-router-dom";


const STATUS_CLASSES = {
    PAID : "success",
    SENT : "info",
    CANCELLED : "danger"
};

const STATUS_LABELS = {
    PAID : "Payée",
    SENT : "Envoyée",
    CANCELLED : "Annulée"
};



const InvoicesPage = props => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    // RECUPERER LES INVOICES AUPRES DE L'API
    const fetchInvoices = async () => {
        try {
            const data = await axios.get("http://127.0.0.1:8000/api/invoices")
                .then(response => response.data['hydra:member']);

            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    // GESTION DU FORMAT DE LA DATE
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // CHARGER LES INVOICES
    useEffect(() => {
        fetchInvoices();
    }, []);


    // GESTION DE LA SUPPRESSION
    const handleDelete = async  id => {
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try {
            await axios.delete("http://127.0.0.1:8000/api/invoices/" + id);
        } catch (error) {
            console.log(error);
            setInvoices(originalInvoices);
        }
    };



    // GESTION DE LA RECHERCHE
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);

    };

    const filteredCustomers = invoices.filter(
        i => i.customer.firstname.toLowerCase().includes(search.toLowerCase())
            ||
            i.customer.lastname.toLowerCase().includes(search.toLowerCase())
            ||
            // i.amount.toString().includes(search.toLowerCase())
            i.amount.toString().startsWith(search.toLowerCase())
            ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())

    );


    // GESTION DE LA PAGINATION
    // fonction qui recoit une page que l'on souhaite afficher
    const handleChangePage = (page) => {
        // je vais changer mon currentPage à page
        setCurrentPage(page);
    };
    const itemPerPage = 20;
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemPerPage);


    return (
      <>

          <div className="d-flex justify-content-between align-items-center mb-3">
              <h1>Liste des factures</h1>

              <Link className="btn btn-primary" to="/invoice/create">Créer une facture</Link>
          </div>

          <div className="form-group">
              <input type="text" className="form-control" placeholder="Rechercher ... " value={search} onChange={handleSearch}/>
          </div>

          <table className="table table-hover">
              <thead>
                  <tr>
                      <th>Numéro</th>
                      <th>Client</th>
                      <th className="text-center">Date d'envoie</th>
                      <th className="text-center">Statut</th>
                      <th className="text-center">Montant</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>

              {paginatedCustomers.map(invoice =>
                  <tr key={invoice.id}>
                      <td>{invoice.chrono}</td>
                      <td>
                          <a href="#">{invoice.customer.firstname} {invoice.customer.lastname}</a>
                      </td>
                      <td className="text-center">{formatDate(invoice.sentAt)}</td>
                      <td className="text-center">
                          <span className={"badge pb-1 badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                      </td>
                      <td className="text-center">{invoice.amount.toLocaleString()}</td>
                      <td>
                          <Link to={"/invoice/" +invoice.id} className="btn btn-sm btn-primary mr-1">Editer</Link>
                          <button
                              onClick={ () => handleDelete(invoice.id)}
                              className="btn btn-danger btn-sm">Supprimer</button>
                      </td>
                  </tr>
              )}

              </tbody>
          </table>

          <Pagination
              currentPage={currentPage}
              itemsPerPage={itemPerPage}
              length={filteredCustomers.length}
              onPageChanged={handleChangePage}
          />

      </>
    );
};

export default InvoicesPage;