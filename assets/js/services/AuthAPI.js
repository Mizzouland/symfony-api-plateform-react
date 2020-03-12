import axios from "axios";


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


function logout() {
    window.localStorage.removeItem('authToken');
    delete axios.defaults.headers["Authorization"];
}

export default {
    authenticate,
    logout
}