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
    formPush(){
        if(!this.props.address && !this.props.city && !this.props.usState && !this.props.zip){
            alert('Please fill in all fields')
        }else{
           this.props.history.push('/wizardThree') 
        }
    }
    
    render(){
        const {updateAddress, updateCity, updateState, updateZip} = this.props
        return(
            <div>
                <WizHeader/>
                <p>Step 2</p>
                <img src='step_completed.png' alt=''/>
                <img src='step_active.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                <img src='step_inactive.png' alt=''/>

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
                <button onClick={() => this.formPush()}>Next Step</button>
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