import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from '../login/login'
import Dashboard from '../components/dashboard'
import WizOne from '../components/wizards/wizOne'
import WizTwo from '../components/wizards/wizTwo'
import WizThree from '../components/wizards/wizThree'
import WizFour from '../components/wizards/wizFour'
import WizFive from '../components/wizards/wizFive'

export default function Nav(){
    return(
        <div>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/wizardOne' component={WizOne}/>
                <Route path='/wizardTwo' component={WizTwo}/>
                <Route path='/wizardThree' component={WizThree}/>
                <Route path='/wizardFour' component={WizFour}/>
                <Route path='/wizardFive' component={WizFive}/>
            </Switch>
        </div>
    )
}