import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from '../login/login'
import Dashboard from '../components/dashboard'

export default function Nav(){
    return(
        <div>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/dashboard' component={Dashboard}/>
            </Switch>
        </div>
    )
}