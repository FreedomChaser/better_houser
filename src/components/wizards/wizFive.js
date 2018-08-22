import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateUserid, updateDesiredRent, updateRecommendedRent} from '../../ducks/reducer'
import axios from 'axios'

class WizFive extends Component{
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/confirmUser').then(res => {
                this.props.updateUserid(res)
                let {monthly_mortgage} = this.props

                let percentNum = monthly_mortgage * .25

                let rent = percentNum + monthly_mortgage

        updateRecommendedRent(rent) 
            }).catch(err => {
                this.props.history.push('/')
            })
        }
               
    }

    completeBtn(){
        axios.post('/api/complete', {...this.props.state})
        .then(() => this.props.history.push('/dashboard'))
    }

    render(){
        return(
            <div>
                <WizHeader/>
                <p>Step 5</p>
                {/* 5 dots */}
                {/* add rent variable */}
                <p>Recommended Rent {this.props.recommended_rent}</p>
                <p>Desired Rent</p>
                <input onChange={e => updateDesiredRent(e.target.value)}/>
                <Link to='/wizardFour'><button>Previous Step</button></Link>
                {/* figure out how you wantto save this to db */}
                <button onClick={() => this.completeBtn()}>Complete</button>
            </div>
        )
    }
}

function mapStateToProps(state){

    return{
        //return state and do axios call here? or make a new func comp
        state
    }
}

export default connect(mapStateToProps, {updateUserid, updateDesiredRent, updateRecommendedRent})(WizFive)

//_debounce