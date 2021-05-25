import { Component } from 'react';

class Deconnect extends Component {

    componentDidMount() {
        this.props.connectedFalse()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.props.history.push('/login')  
    }
    
    render() {
        return null
    }
}

export default Deconnect;