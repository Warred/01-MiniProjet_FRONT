import React, { Component } from 'react';
import apiBack from '../../API/apiBack';
import { ajoutPanier, getQuantite, retirePanier } from '../../functions/panierService';


import Loader from '../loader';


class CardProduit extends Component {
    state = {
        type: null,
        isLoading: true,
        quantite: 0
    }
    
    componentDidMount() { 
        const url = '/public/type-de-produits/' + this.props.produit.typeId
        apiBack.get(url).then(resp=>{
            if (resp.status === 200) {
                this.setState({
                    type: resp.data.type,
                    isLoading: false,
                    quantite: getQuantite(this.props.produit.id)
                })
            }
        })
        .catch( error => console.log(error) )
    }

    render() {
        const {produit, quantite} = this.props
        
        const {isLoading, type} = this.state
        if (isLoading) return <Loader/>
        return (

            <div className="card shadow mx-3 my-3" id="produitCard" >
                <img src={produit.image} alt={produit.description} />        
                <div>{produit.nom}</div>
                <div className="card-body bg-dark text-light" id="cardBody">
                    <h4 className="text-warning">{produit.prix} €</h4>
                    <p className="fs-3 text-info">{produit.description}</p>
                    <p className="fs-5"><i>Rayon {type}</i></p>                    
                </div>                
                <div className="bg-dark d-flex justify-content-center" id="cardBottom">
                    { (quantite>0) ?
                    <>
                        <button onClick={() => this.moinsProduit(produit.id)} id="cardButton" className="bg-warning rounded border-dark text-dark"><b>-1</b></button> 
                        <button id="cardQuantite" className="bg-light rounded border-dark text-dark"><b>{quantite}</b></button>
                        <button onClick={() => this.addProduit(produit)} id="cardButton" className="bg-success rounded border-dark text-dark"><b>+1</b></button>
                    </> : 
                    <button onClick={() => this.addProduit(produit)} id="cardButton" className="bg-success rounded border-dark text-dark"><b>Acheter</b></button>
                    }
                </div>
            </div>
        );
    }
    addProduit = (prod) => {        
        ajoutPanier(prod)
        const qte = getQuantite(prod.id)
        this.setState({quantite: qte})
        this.props.updatePanier()
    }

    moinsProduit = (idProd) => {
        retirePanier(idProd)
        const qte = getQuantite(idProd)
        this.setState({quantite: qte})
        this.props.updatePanier()
    }
}

export default CardProduit;