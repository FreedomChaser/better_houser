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

    formPush(){
        if(!this.props.loan_amount && !this.props.monthly_mortgage){
            alert('Please fill in all fields')
        }else{
           this.props.history.push('/wizardFive') 
        }
    }

    render(){
        const {updateLoanAmount, updateMonthlyMortgage} = this.props
        return(
            <body>
                <main>
                <WizHeader/>
                <p>Step 4</p>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_active.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                {/* 5 dots */}
                <p>Loan Amount</p>
                <input onChange={e => updateLoanAmount(e.target.value)}/>
                <p>Monthly Mortgage</p>
                <input onChange={e => updateMonthlyMortgage(e.target.value)}/>
                <Link to='/wizardThree'><button>Previous Step</button></Link>
                <button onClick={() => this.formPush()}>Next Step</button>
                </main>
            </body>
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