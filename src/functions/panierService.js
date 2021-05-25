
import apiBack from './../API/apiBack';

export function ajoutPanier(produit) {
    const idProd = produit.id
    var test = JSON.parse(localStorage.getItem('panier'))
    var ligne= {}
    var panier = []
    ligne= {id: idProd, nom: produit.nom, prix: produit.prix, produit: produit, qte: 1}
    if (test !== null) {
        panier = panier.concat(test)
        const i = panier.findIndex(prod => prod.id === idProd)
        if (i > -1) { panier[i].qte++
        } else panier.push(ligne)
    } else panier.push(ligne)
    localStorage.setItem('panier', JSON.stringify(panier))
}

export function retirePanier(idProd) {
    var panier = JSON.parse(localStorage.getItem('panier'))
    const i = panier.findIndex(prod => prod.id === idProd)
    panier[i].qte--
    if (panier[i].qte < 1) panier.splice(i, 1)
    if (panier.length < 1 ) localStorage.setItem('panier', null) 
    else localStorage.setItem('panier', JSON.stringify(panier))
}

export function getQuantite(idProd) {
    var panier = []
    var test = JSON.parse(localStorage.getItem('panier'))
    if (test !== null) panier = panier.concat(test)
    var qte = 
        panier.find(prod => prod.id === idProd) ?
            panier.find(prod => prod.id === idProd).qte
        : 0
    return qte
}

export function getPanier() {
    return JSON.parse(localStorage.getItem('panier'))
}

export function valideCommande() {
    apiBack.get('/account').then(acc => {
        var user = acc.data
    })
}

export function deletePanier() {
    localStorage.setItem('panier', null)
}
