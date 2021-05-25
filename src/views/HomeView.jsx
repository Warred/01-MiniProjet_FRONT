import React, { Component } from 'react';
import ListeProduit from '../components/produit/ListeProduit';



class HomeView extends Component {
    
    render() {
        return ( <>
        <ListeProduit panier={this.props.panier} connected={this.props.connected} updatePanier={this.props.updatePanier}/>
        </>)
    }
}

export default HomeView;