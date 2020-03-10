import React, {useState} from 'react';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username:  "",
        password: ""
    });

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value})
    };

    const handleSubmit = event => {
            event.preventDefault();
            console.log(credentials);
    };


    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        type="email"
                        placeholder="adresse email de connexion"
                        name="username"
                        id="username"
                        className="form-control"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        id="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Je me connecte</button>
                </div>
            </form>

        </>
    )
};

export default LoginPage;