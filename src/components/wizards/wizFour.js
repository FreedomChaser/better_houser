import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateUserid, updateLoanAmount, updateMonthlyMortgage} from '../../ducks/reducer'
import axios from 'axios'

class WizFour extends Component{
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
        const {updateLoanAmount, updateMonthlyMortgage} = this.props
        return(
            <div>
                <WizHeader/>
                <p>Step 4</p>
                {/* 5 dots */}
                <p>Loan Amount</p>
                <input onChange={e => updateLoanAmount(e.target.value)}/>
                <p>Monthly Mortgage</p>
                <input onChange={e => updateMonthlyMortgage(e.target.value)}/>
                <Link to='/wizardThree'><button>Previous Step</button></Link>
                <Link to='/wizardFive'><button>Next Step</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {userid, loan_amount, monthly_mortgage} = state

    return{
        userid,
        loan_amount,
        monthly_mortgage
    }
}

export default connect(mapStateToProps, {updateUserid, updateLoanAmount, updateMonthlyMortgage}) (WizFour)