import React , {useState, useContext} from 'react';
import ReactDOM from "react-dom";

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter , Switch, Route, withRouter, Redirect} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import CustomersPagePaginationApi from "./pages/CustomersPagePaginationApi";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/AuthAPI";

import AuthContext from "./contexts/AuthContext";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore!!! Edit me in assets/js/app.js');

AuthAPI.setUp();

const PrivateRoute = ({path, component}) => {

    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? <Route path={path} component={component} /> : <Redirect to="/login"/>
};




const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    // comme la navbar ne fait pas partie du composant Route
    const NavbarWithRouter =  withRouter(Navbar);

    const contextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
                <NavbarWithRouter />

                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>

                        <PrivateRoute path="/customers"  component={CustomersPage} />

                        <Route path="/invoices"
                               render={ props => {
                                   if (isAuthenticated) return <InvoicesPage {...props} />;
                                   return <Redirect to="/login"/>;
                               }}
                        />

                        <Route path="/" component={HomePage} />

                    </Switch>
                </main>

            </HashRouter>

        </AuthContext.Provider>
        )
    ;
};



const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);


