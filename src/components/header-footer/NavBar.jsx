import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../loader';

class NavBar extends Component {

    state = { 
        user: { id: 0, username: 'Non Connecté(e)', nom: 'null', prenom: 'null', authorities: []},
        isLoading: false
     }

    render() {
        const {isLoading} = this.state            
        if (isLoading) return <Loader/>
        const {connected} = this.props  

        return (
            <header className="navbar navbar-dark bg-dark" id="navbar">
                <NavLink exact to='/' className="nav-link"
                        activeClassName="bg-success text-white">
                        Accueil : 
                </NavLink>
                <NavLink to='/login' className="me-2" style={{display: (!connected) ? 'block' : 'none' }}>Se connecter <i className="fas fa-sign-in-alt ms-1"></i></NavLink>
                <NavLink to='/deco' className="me-2" style={{display: (connected) ? 'block' : 'none' }}>Se déconnecter <i className="fas fa-sign-out-alt ms-1"></i></NavLink>
                
            </header>
        );
    }
    
}

export default NavBar;