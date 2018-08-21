import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updatePropertyName} from '../../ducks/reducer'
import {updatePropertyDescription} from '../../ducks/reducer'

class WizOne extends Component{
    render(){
        const {updatePropertyDescription, updatePropertyName} = this.props
        return(
            <div>
                <WizHeader/>
                <p>Step 1</p>
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
    const {property_name, property_description} = state

    return{
        property_name,
        property_description
    }
}
export default connect(mapStateToProps, {updatePropertyName, updatePropertyDescription}) (WizOne)