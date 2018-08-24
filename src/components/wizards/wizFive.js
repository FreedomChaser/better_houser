import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateUserid, updateDesiredRent, updateRecommendedRent} from '../../ducks/reducer'
import axios from 'axios'

class WizFive extends Component{
    constructor(){
        super()

        this.state = {
            recommended_rent: 0
        }
    }
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/confirmUser').then(res => {
                this.props.updateUserid(res)
                // .then(() => {
                //     

                // })
                
            }).catch(err => {
                this.props.history.push('/')
            })
        }
            let {monthly_mortgage} = this.props
    
            let percentNum = Number(monthly_mortgage) * .25

            let rent = percentNum + Number(monthly_mortgage)

            console.log(rent)
            this.props.updateRecommendedRent(rent)
            
            this.setState({recommended_rent: rent})

    }

    completeBtn(){
        axios.post('/api/complete', {
            userid: this.props.userid, 
            property_name: this.props.property_name, 
            property_description: this.props.property_description, 
            address: this.props.address, 
            city: this.props.city, 
            usState: this.props.usState, 
            zip: this.props.zip, 
            img_url: this.props.img_url,
            img_alt: this.props.img_alt,
            loan_amount: this.props.loan_amount,
            monthly_mortgage: this.props.monthly_mortgage,
            desired_rent: this.props.desired_rent,
            recommended_rent: this.props.recommended_rent
        })
        .then(() => this.props.history.push('/dashboard'))
    }

    render(){
        console.log('props rent', this.state.recommended_rent)
        return(
            <body>
                <main>
                <WizHeader/>
                <p>Step 5</p>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                {/* 5 dots */}
                {/* add rent variable */}
                <p>Recommended Rent {this.state.recommended_rent}</p>
                <p>Desired Rent</p>
                <input onChange={e => this.props.updateDesiredRent(e.target.value)}/>
                <Link to='/wizardFour'><button>Previous Step</button></Link>
                {/* figure out how you wantto save this to db */}
                <button onClick={() => this.completeBtn()}>Complete</button>
                </main>
            </body>
        )
    }
}

function mapStateToProps(state){
    const {
            userid, 
            property_name, 
            property_description, 
            address, 
            city, 
            usState, 
            zip, 
            img_url,
            img_alt,
            loan_amount,
            monthly_mortgage,
            desired_rent,
            recommended_rent
        } = state
    return{
        //return state and do axios call here? or make a new func comp
        userid, 
        property_name, 
        property_description, 
        address, 
        city, 
        usState, 
        zip, 
        img_url,
        img_alt,
        loan_amount,
        monthly_mortgage,
        desired_rent,
        recommended_rent
    }
}

export default connect(mapStateToProps, {updateUserid, updateDesiredRent, updateRecommendedRent})(WizFive)

//_debounce