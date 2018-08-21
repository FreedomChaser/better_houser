import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateAddress, updateCity, updateState, updateZip} from '../../ducks/reducer'

class WizTwo extends Component{
    render(){
        return(
            <div>
                <WizHeader/>
                <p>Step 2</p>
                {/* 5 dots */}
                <p>Address</p>
                <input onChange={e => updateAddress(e.target.value)}/>
                <p>City</p>
                <input onChange={e => updateCity(e.target.value)}/>
                <p>State</p>
                <input onChange={e => updateState(e.target.value)}/>
                <p>Zip</p>
                <input onChange={e => updateZip(e.target.value)}/>
                <Link to='/wizardOne'>
                    <button>Previous Step</button>
                </Link>
                <Link to='/wizardThree'>
                    <button>Next Step</button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {address, city, usState, zip} = state

    return{
        address,
        city,
        usState,
        zip
    }
}

export default connect(mapStateToProps, {updateAddress, updateCity, updateState, updateZip}) (WizTwo)