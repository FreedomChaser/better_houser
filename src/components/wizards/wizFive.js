import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateDesiredRent} from '../../ducks/reducer'

class WizFive extends Component{
    constructor(){
        super()

        this.state ={
            recommendedRent: 0,
            monthlyMortgage: 0,
        }
    }
    
    componentDidMount(){
        //pull monthly mortgage off reducer and set to state
        let {monthlyMortgage} = this.state

        let percentNum = monthlyMortgage * .25

        let rent = percentNum + monthlyMortgage

        return rent        
    }

    render(){
        return(
            <div>
                <WizHeader/>
                <p>Step 5</p>
                {/* 5 dots */}
                {/* add rent variable */}
                <p>Recommended Rent {this.componentDidMount}</p>
                <p>Desired Rent</p>
                <input onChange={e => updateDesiredRent(e.target.value)}/>
                <Link to='/wizardFour'><button>Previous Step</button></Link>
                {/* figure out how you wantto save this to db */}
                <button>Complete</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {desiredRent} = state

    return{
        desiredRent
    }
}

export default connect(mapStateToProps, {updateDesiredRent})(WizFive)