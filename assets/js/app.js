import React from 'react';
import ReactDOM from "react-dom";

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter , Switch, Route} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import CustomersPagePaginationApi from "./pages/CustomersPagePaginationApi";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore!!! Edit me in assets/js/app.js');



const App = () => {
    return <HashRouter>
            <Navbar/>

            <main className="container pt-5">
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/customers" component={CustomersPage} />
                    <Route path="/invoices" component={InvoicesPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>

        </HashRouter>;
};



const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);