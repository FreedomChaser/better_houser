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
                <div className='wizOne'>
                <div className='oneHeader'>
                <p className='oneTxt'>Step 4</p>
                </div>
                <div className='dots'>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_active.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                </div>
                {/* 5 dots */}
                <div className='fourInputs'>
                <p className='propName'>Loan Amount</p>
                <input className='nameInput' onChange={e => updateLoanAmount(e.target.value)}/>
                <p className='propName'>Monthly Mortgage</p>
                <input className='nameInput' onChange={e => updateMonthlyMortgage(e.target.value)}/>
                </div>
                <div className='fourBtns'>
                <Link to='/wizardThree'><button className='twoPrev'>Previous Step</button></Link>
                <button className='twoNext' onClick={() => this.formPush()}>Next Step</button>
                </div>
                </div>
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