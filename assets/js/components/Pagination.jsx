import React from 'react';





const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {
    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <ul className="pagination pagination-sm">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button
                        className="page-link"
                        onClick={() => onPageChanged(currentPage - 1)}
                    >
                        &laquo;
                    </button>
                </li>
                {pages.map(page => (
                    <li
                        key={page}
                        className={"page-item" + (currentPage === page && " active")}
                    >
                        <button className="page-link" onClick={() => onPageChanged(page)}>
                            {page}
                        </button>
                    </li>
                ))}

                <li
                    className={"page-item" + (currentPage === pagesCount && " disabled")}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChanged(currentPage + 1)}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </div>
    );
};


Pagination.getData =  (items, currentPage, itemsPerPage) => {
    // il nous faut deux valeur
    // d'où on part (start) pendant combien (itemsPerPage)
    const start = currentPage * itemsPerPage - itemsPerPage;
    // imaginons que nous sommes sur la page numéro 3 * 10 - 10 = 20 --> on partirai de 20
    const paginatedCustomers = items.slice(start, start + itemsPerPage);

    return paginatedCustomers;
};

export default Pagination;