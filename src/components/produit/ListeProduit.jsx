import React, { Component } from 'react';
import apiBack from '../../API/apiBack';
import { ajoutPanier, deletePanier, getPanier, getQuantite, retirePanier } from '../../functions/panierService';
import Loader from '../loader';
import CardProduit from './CardProduit';

class ListeProduit extends Component {
    state = {
        listProd: null,
        isLoading: true
    }

    componentDidMount() {
        apiBack.get('/public/produits').then(resp=>{
            if (resp.status === 200) {
                this.setState({
                    listProd: resp.data,
                    isLoading: false
                })
            }
        })
        .catch( error => console.log(error) )
    }
    render() {
        var{listProd, isLoading} = this.state        
        if (isLoading) return <div><Loader/></div>

        const {connected, panier} = this.props  
        var total = 0.00
        var nbArticles = 0
        var panierTmp = getPanier()
        if (panierTmp) panierTmp.map(ligne => { 
            nbArticles += ligne.qte
            return null
        })
        return (
            <div>
                <div 
                    id="panierTitle" className="bg-dark text-light col-3" style={{display: (connected) ? 'block' : 'none' }}>
                        <image className="fas fa-shopping-cart fa-3x m-1"></image><div className="badge bg-danger" id="panierNotif">{nbArticles}</div><span className="h4 p-4"><b>Mon panier</b></span>
                        <div id="panierContent" className="bg-info p-1">{(panier) ? <>                            
                            {
                            panier.map( (ligne, index) => {
                                var sousTotal = Number(ligne.qte) * Number(ligne.prix)
                                total += sousTotal
                                nbArticles += Number(ligne.qte)
                                return <div id="panierLigne" className="border my-1 rounded" key={index}>
                                    <div className="pl-2"><b>{ligne.nom}</b></div><div className="pl-2"> ({ligne.prix} € /u)</div>
                                    <div className="text-dark d-flex justify-content-between mx-1">
                                        <div>
                                            <button onClick={() => this.moinsProduit(ligne.id)} id="cardButton" className="bg-warning rounded border-dark text-dark"><b>-</b></button> 
                                            <button id="cardQuantite" className="bg-light rounded border-dark text-dark"><b>{ligne.qte}</b></button>
                                            <button onClick={() => this.addProduit(ligne.produit)} id="cardButton" className="bg-success rounded border-dark text-dark"><b>+</b></button>
                                        </div>
                                        <div className="text-light bg-dark p-1 m-1"><b>{sousTotal.toFixed(2)} €</b></div>
                                        
                                    </div>                              
                                </div>
                            })}
                            </>
                        : <span>Veuillez choisir vos articles</span>
                        }</div>
                        <div className="d-flex justify-content-between m-1">
                            <div>Total : {total.toFixed(2)} €</div>
                            <button style={{display: (total > 0) ? 'block' : 'none' }}
                                className="bg-success rounded border-dark text-dark"
                                onClick={() => this.postCommande(panier)}
                            >Commander</button>
                            
                        </div>
                </div>
                <div className="d-flex flex-wrap mb-4 ml-4 col-9">
                    {listProd.map( (produit, index) => {
                        var quantite = getQuantite(produit.id)
                        return <CardProduit key={index} produit={produit} updatePanier={this.props.updatePanier} quantite={quantite}/>
                    })}
                </div>
            </div>
        );
    }

    addProduit = (prod) => {        
        ajoutPanier(prod)
        this.props.updatePanier()
    }

    moinsProduit = (idProd) => {
        retirePanier(idProd)
        this.props.updatePanier()
    }

    postCommande = (panier) => {
        deletePanier()
    }
}

export default ListeProduit;