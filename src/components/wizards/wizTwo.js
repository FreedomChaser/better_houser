import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateUserid, updateAddress, updateCity, updateState, updateZip} from '../../ducks/reducer'
import axios from 'axios'

class WizTwo extends Component{
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
        const {updateAddress, updateCity, updateState, updateZip} = this.props
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
    const {userid, address, city, usState, zip} = state

    return{
        userid,
        address,
        city,
        usState,
        zip
    }
}

export default connect(mapStateToProps, {updateUserid, updateAddress, updateCity, updateState, updateZip}) (WizTwo)