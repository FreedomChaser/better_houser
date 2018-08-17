import React, {Component} from 'react'
import axios from 'axios'

export default class Login extends Component{
    constructor(){
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    registerUser(){
        axios.post('/api/newUser', {
            username: this.state.username,
            password: this.state.password
        })
        //add a .then that redirects them to the dashboard
        //build out nav and routes to do so
    }

    render(){
        return(
            <div>
                <p>Username</p>
                <input onChangej={e => this.setState({username: e.target.value})}></input>
                <p>Password</p>
                <input onChangej={e => this.setState({password: e.target.value})}></input>
                <button onClick={loginUser}>Login</button>
                <button onClick={registerUser}>Register</button>
            </div>
        )
    }
}