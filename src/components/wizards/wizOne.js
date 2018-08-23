import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updatePropertyName} from '../../ducks/reducer'
import {updatePropertyDescription, updateUserid} from '../../ducks/reducer'
import axios from 'axios'

class WizOne extends Component{
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/confirmUser').then(res => {
                this.props.updateUserid(res)
            }).catch(err => {
                this.props.history.push('/')
            })
        }
    }
    
    render(){
        const {updatePropertyDescription, updatePropertyName} = this.props
        return(
            <div>
                <WizHeader/>
                <p>Step 1</p>
                <img src='step_active.png' alt='filled in green circle'/>
                <img src='step_inactive.png' alt='faded out green circle'/>
                <img src='step_inactive.png' alt='faded out green circle'/>
                <img src='step_inactive.png' alt='faded out green circle'/>
                <img src='step_inactive.png' alt='faded out green circle'/>
                {/* 5 dots imgs */}
                <p>Property Name</p>
                <input onChange={e => updatePropertyName(e.target.value)}/>
                <p>Property Description</p>
                <input onChange={e => updatePropertyDescription(e.target.value)}/>
                <Link to='/wizardTwo'>
                <button>Next Step</button>
                </Link>
            </div>
        ) 
    }
}

function mapStateToProps(state){
    const {userid, property_name, property_description} = state

    return{
        userid,
        property_name,
        property_description
    }
}
export default connect(mapStateToProps, {updatePropertyName, updatePropertyDescription, updateUserid}) (WizOne)