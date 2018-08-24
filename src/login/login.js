import React, {Component} from 'react'
import axios from 'axios'
import {updateUserid} from '../ducks/reducer'
import {connect} from 'react-redux'

class Login extends Component{
    constructor(){
        super()

        this.state = {
            username: '',
            password: ''
        }
        this.registerUser = this.registerUser.bind(this)
        this.loginUser = this.loginUser.bind(this)
    }

    //in login and register load userid to reducer
    registerUser(){
        if(!this.state.username || !this.state.password){
            return alert('Please fill in all fields')
        }else{
            axios.post('/api/newUser', {
                username: this.state.username,
                password: this.state.password
        })
        //add a .then that redirects them to the dashboard
        .then((res)=>{
            this.props.updateUserid(res.data.userid)
            this.props.history.push('/dashboard')
        
    })
        .catch((err) => {
            console.log(err)
            alert('Username already exists, if you have previously registered with this site please use login')
        })
    }}
    loginUser(){
        if(!this.state.username || !this.state.password){
            return alert('Please fill in all fields')
        }else{
        axios.post('/api/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then((res) => {
            this.props.updateUserid(res.data.userid)
            this.props.history.push('/dashboard')})
        .catch(err => {
            console.log('login', err)
            alert('User not found')
        })
    }}

    render(){
        return(
            <body>
                <main id='loginMain'>
                <img src='auth_logo.png' className='houseLogo' alt=''/>
                <p className='loginTxt'>Username</p>
                <input className='loginInput' onChange={e => this.setState({username: e.target.value})}></input>
                <p className='loginTxt'>Password</p>
                <input className='loginInput' onChange={e => this.setState({password: e.target.value})}></input>
                <div className='loginBtns'>
                <button className='loginBtn' onClick={this.loginUser}>Login</button>
                <button className='registerBtn' onClick={this.registerUser}>Register</button>
                </div>
                </main>
            </body>
        )
    }
}

export default connect(null, {updateUserid}) (Login)