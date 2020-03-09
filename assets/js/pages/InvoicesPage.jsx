import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../components/Pagination";
import moment from "moment";


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

    const fetchInvoices = async () => {
        try {
            const data = await axios.get("http://127.0.0.1:8000/api/invoices")
                .then(response => response.data['hydra:member']);

            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
      <>
        <h1>Liste des factures</h1>
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
              {invoices.map(invoice =>

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
                      <td></td>
                  </tr>
              )}
              </tbody>
          </table>

      </>
    );
};

export default InvoicesPage;