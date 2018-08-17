import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Nav extends Component{
    logout(){
            axios.post('/api/logout')
            .then(this.props.history.push('/'))
        }
    render(){
        // console.log('props', this.props.history)
        if(this.props.location.pathname !== '/'){
            return(
                <header className='nav'>
                <div className='navLeft'>
                    <img src='header_logo.png' alt='houser loge--simple outline of a house'/>
                    <h1>Houser</h1>
                    <h1>Dashboard</h1>
                </div>
                <button onClick={() => this.logout()}>Logout</button>
                </header>
            )
        }else{
            return null
        }
    }
}
export default withRouter(Nav)