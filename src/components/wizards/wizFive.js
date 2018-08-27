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
            }).catch(err => {
                this.props.history.push('/')
            })
        }
            let {monthly_mortgage} = this.props
    
            let percentNum = Number(monthly_mortgage) * .25

            let rent = percentNum + Number(monthly_mortgage)

            this.props.updateRecommendedRent(rent)
            
            this.setState({recommended_rent: rent})

    }

    completeBtn(){
        if(!this.props.desired_rent){
            alert('Please fill in all fields')
        }else{            
            console.log('fired')
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
}

    render(){
        console.log('props rent', this.state.recommended_rent)
        return(
            <body>
                <main>
                <WizHeader/>
                <div className='wizOne'>
                <div className='oneHeader'>
                <p>Step 5</p>
                </div>
                <div className='dots'>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_active.png' alt=''/>
                </div>
                {/* 5 dots */}
                <div className='rentDiv'>
                <p className='rentRec'>Recommended Rent ${this.state.recommended_rent}</p>
                </div>
                <div className='desRent'>
                <p className='propName'>Desired Rent</p>
                <input className='nameInput' onChange={e => this.props.updateDesiredRent(e.target.value)}/>
                </div>
                <div className='fiveBtns'>
                <Link to='/wizardFour'><button className='twoPrev'>Previous Step</button></Link>
                {/* save whole for to db */}
                <button className='completedBtn' onClick={() => this.completeBtn()}>Complete</button>
                </div>
                </div>
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