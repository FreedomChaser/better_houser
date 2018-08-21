import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateLoanAmount, updateMonthlyMortgage} from '../../ducks/reducer'

class WizFour extends Component{
    render(){
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
    const {loan_amount, monthly_mortgage} = state

    return{
        loan_amount,
        monthly_mortgage
    }
}

export default connect(mapStateToProps, {updateLoanAmount, updateMonthlyMortgage}) (WizFour)