import axios from "axios";
import jwtDecode from "jwt-decode";


function authenticate(credentials)
{
    return axios.post("http://127.0.0.1:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            // je stocke le token dans mon localStorage
            window.localStorage.setItem("authToken", token);

            // il faut que pour axios toute requète est un header avec authorisation et on va lui ajouter une configuration par défaut
            axios.defaults.headers["Authorization"] =  "Bearer "+token;

            return true;
        });
}


function logout()
{
    window.localStorage.removeItem('authToken');
    delete axios.defaults.headers["Authorization"];
}

function setUp()
{
    // 1 . voir si on a un token
    const token = window.localStorage.getItem("authToken");

    // 2 . si le token est encore valide
    if (token) {
        const jwtData = jwtDecode(token);
        console.log(jwtData);
        // jwtData.exp est un timestamp en second (soit on X 1000)
        // new Date() est un timestam en millisecond (soit on / 1000)
        // Si la date d'expiration est plus grande que maintenant, mon token est donc valide
        if (jwtData.exp * 1000 > new Date().getTime()) {
            // 3 . Donner le token à axios
            axios.defaults.headers["Authorization"] =  "Bearer "+token;
        } else {
            logout();
        }
    } else {
        logout();
    }

}


function isAuthenticated() {
    // 1 . voir si on a un token
    const token = window.localStorage.getItem("authToken");

    // 2 . si le token est encore valide
    if (token) {
        const {exp : expiration} = jwtDecode(token);
           if (expiration * 1000 > new Date().getTime()) {
               return true;
            }
           return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
}