import React from 'react';

export default React.createContext(
    {
            isAuthenticated: false,
            seIsAuthenticated: (value) => {}
    });





/****
 * Le context va servir à mettre en place des données que l'on aura pas besoin de passer à nos petits composants en
 * paramètres. Il pourront les découvrir tous seul grace à la notion de Context.
 * Comme par exemple isAuthenticated et setIsAuthenticated
 * Elle prend en paramètre la forme des informations que l'on veut passer, une sorte d'interface
 *
 * Ce context , on va pouvoir l'utiliser comme un composant en disant que toutes l'application rentre dans un composant
 * qui s'appelle AuthContext.Provider
 *
 * C'est à dire que tout les composants ont accès au authContext pour savoir si on est authentifier
 *
 * Ensuite dans le composant Navbar par exemple, nous sommes en mesure de retirer les props
 * Dans le composant lui meme on import le Authcontext
 * Et on va utiliser un hooks pour faire référence à mon onLogout et isAuthenticated

 */