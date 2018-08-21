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
        this.loginUser = this.loginUser.bind(this)
    }

    registerUser(){
        axios.post('/api/newUser', {
            username: this.state.username,
            password: this.state.password
        })
        //add a .then that redirects them to the dashboard
        .then(()=>{this.props.history.push('/dashboard')})
        .catch((err) => {
            alert('Username already exists, if you have previously registered with this site please use login')
        })
    }
    loginUser(){
        axios.post('/api/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(() => {this.props.history.push('/dashboard')})
        .catch(err => {
            alert('User not found')
        })
    }

    render(){
        return(
            <div>
                <p>Username</p>
                <input onChange={e => this.setState({username: e.target.value})}></input>
                <p>Password</p>
                <input onChange={e => this.setState({password: e.target.value})}></input>
                <button onClick={this.loginUser}>Login</button>
                <button onClick={this.registerUser}>Register</button>
            </div>
        )
    }
}