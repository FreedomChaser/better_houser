import React, {Component} from 'react'
import axios from 'axios'

export default class Login extends Component{
    constructor(){
        super()

        this.state = {
            username: '',
            password: ''
        }
        this.registerUser = this.registerUser.bind(this)
    }

    registerUser(){
        axios.post('/api/newUser', {
            username: this.state.username,
            password: this.state.password
        })
        //add a .then that redirects them to the dashboard
        .then(this.props.history.push('/dashboard'))
    }

    render(){
        return(
            <div>
                <p>Username</p>
                <input onChangej={e => this.setState({username: e.target.value})}></input>
                <p>Password</p>
                <input onChangej={e => this.setState({password: e.target.value})}></input>
                {/* <button onClick={loginUser}>Login</button> */}
                <button onClick={this.registerUser}>Register</button>
            </div>
        )
    }
}