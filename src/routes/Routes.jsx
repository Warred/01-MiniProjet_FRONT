import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomeView from '../views/HomeView';
import NavBar from '../components/header-footer/NavBar';
import Deconnect from '../components/Deconnect';
import FormLogin from '../components/formulaires/FormLogin';
import { getPanier } from './../functions/panierService';

const history = createBrowserHistory()

class Routes extends Component {
    constructor(props) {
        super(props)
        this.state = { connected: false, panier: getPanier() }
    }
    componentDidMount() {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : false
        if (token) this.setState({ connected: true})
    }

    connectedTrue = () =>  this.setState({ connected: true }) 
    connectedFalse = () => this.setState({ connected: false })
    updatePanier = () => this.setState({panier: JSON.parse(localStorage.getItem('panier'))})

    render() {
        const {connected, panier} = this.state
        if (connected) {
            return (
                <div>
                    <BrowserRouter>
                        <NavBar connected={connected} updatePanier={this.updatePanier}/>
                        <Switch history={history}>
                            <Route exact path="/" render={(props) => <HomeView {...props} panier={panier} connected={connected} updatePanier={this.updatePanier}/>} />                      
                            <Route path="/deco" render={(props) => <Deconnect {...props} connectedFalse={this.connectedFalse}/>} />
                        </Switch>
                    </BrowserRouter>
                </div>
            );
        } else {
            return (
                <div>
                    <BrowserRouter>
                        <NavBar connected={this.state.connected} />
                        <Switch history={history}>
                            <Route path="/" 
                                render={(props) => 
                                    <FormLogin 
                                        {...props} 
                                        connectedTrue={this.connectedTrue}
                                        updatePanier={this.updatePanier}
                                    />
                                }
                            />
                        </Switch>
                    </BrowserRouter>
                </div>
            )
        }
    }
}

export default Routes;