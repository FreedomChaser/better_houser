//and for loan amount to limit to 8 figures
//make sure all numbers have an error catcher
//auto-clear dash input

import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserid} from '../ducks/reducer'
import {Link} from 'react-router-dom'
//add the sessions block on each route

class Dashboard extends React.Component{
    constructor(){
        super()

        this.state = {
            homes: [],
            homeFilter: 0,
            filterToggle: false,
            
            
        }
        this.deleteHouse = this.deleteHouse.bind(this)
        this.filterToggle = this.filterToggle.bind(this)
        this.filterHome = this.filterHome.bind(this)
    }
    
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/confirmUser').then(res => {
                this.props.updateUserid(res)
            }).catch(err => {
                this.props.history.push('/')
            })
        }
        axios.get(`/api/userHomes/${this.props.userid}`)
        .then(res => {this.setState({homes: res.data})})
    }

    deleteHouse(homeid){
        console.log('firing')
        axios.delete(`/api/deleteHouse/${this.props.userid}/${homeid}`)
        .then(() => {axios.get(`/api/userHomes/${this.props.userid}`)
            .then(res => {this.setState({homes:res.data})})
    })
    }
    resetState(){
        this.setState({homeFilter: 0})
    }
    filterHome(val){
        this.setState({homeFilter: val})
    }

    filterToggle(){
        this.setState({filterToggle: !this.state.filterToggle})
        // this.resetState()
    }

    render(){
    console.log('Home', this.state.homes)

        let displayHome = []
        if(this.state.filterToggle){
            let home = this.state.homes.filter((ele, i) => {
                if(ele.desired_rent >= this.state.homeFilter){
                    console.log('ele', ele)
                    return true
                }else{
                    return false
                }
            })
            // console.log('filtered', displayHome)
           displayHome = home.map((ele, i) => {
            //    console.log('mapele', ele)
            return(
                <div className='dashHomes'>
                    <div className='dashImg'>                                         
                         <img className='imgThumb' src={`${ele.img_url}`||`https://via.placeholder.com/150x150`} alt={`${ele.img_alt}`}/>
                    </div>
                    <div className='dashHome'>
                         <p className='dashHomeName'>{ele.home_name}</p>
                         <p>{ele.description}</p>
                    </div>
                    <div class='dashDeets'>
                        <div className='delete'>
                         <p className='dashHomeDeets'>Loan: ${ele.loan}</p>
                         <img src='delete_icon.png' alt='click to delete' onClick={() => this.deleteHouse(ele.home_id)}/>
                        </div>
                         <p className='dashHomeDeets'>Monthly Mortgage: ${ele.monthly_mortgage}</p>
                         <p className='dashHomeDeets'>Recommended Rent: ${ele.recommended_rent}</p>
                         <p className='dashHomeDeets'>Desired Rent: ${ele.desired_rent}</p>
                         <p className='dashHomeDeets'>Address: {ele.address}</p>
                         <p className='dashHomeDeets'>City: {ele.city}</p>
                    </div>
                </div>
                )
            })
        //unreachable code?
        // this.filterToggle()
    }else{
        displayHome = this.state.homes.map((ele, i) => {
            console.log('else', ele)
            return(
                <div className='dashHomes'>
                    <div className='dashImg'>                                         
                         <img className='imgThumb' src={`${ele.img_url}`||`https://via.placeholder.com/150x150`} alt={`${ele.img_alt}`}/>
                    </div>
                    <div className='dashHome'>
                         <p className='dashHomeName'>{ele.home_name}</p>
                         <p>{ele.description}</p>
                    </div>
                    <div class='dashDeets'>
                        <div className='delete'>
                         <p className='dashHomeDeets'>Loan: ${ele.loan}</p>
                         <img src='delete_icon.png' alt='click to delete' onClick={() => this.deleteHouse(ele.home_id)}/>
                        </div>
                         <p className='dashHomeDeets'>Monthly Mortgage: ${ele.monthly_mortgage}</p>
                         <p className='dashHomeDeets'>Recommended Rent: ${ele.recommended_rent}</p>
                         <p className='dashHomeDeets'>Desired Rent: ${ele.desired_rent}</p>
                         <p className='dashHomeDeets'>Address: {ele.address}</p>
                         <p className='dashHomeDeets'>City: {ele.city}</p>
                    </div>
                </div>
                )
        })
    }

        
        //add state 
        //finish filling out this page with info from db
        //build axios calls in componentDidMount
        //create filter

        return(
            <body>
                <main id='dashMain'>
                <Link to='/wizardOne'><button className='addBtn'>Add new property</button></Link>
                {/* build out wizard routes */}
                {/* link add new property to wizOne route */}
                <p>List properties with "desired rent" greater than: $<input className='dashInput' onChange={e => this.filterHome(e.target.value)} placeholder='0' ></input>
                    <button className='filterBtn' onClick={this.filterToggle}>Filter</button>
                    <button className='resetBtn' onClick={this.filterToggle}>Reset</button>
                </p>
                <div className='homes'>
                    <p className='dashHeader'>Home Listings</p>
                    {/* {home} */}
                    {displayHome}
                </div> 
                </main>
            </body>
        )
    }
}


function mapStateToProps(state){
    const {
            userid, 
           } = state

    return{
        userid,
        // property_name, 
        // property_description, 
        // address, 
        // city, 
        // usState, 
        // zip,
        // img_url,
        // img_alt,
        // loan_amount,
        // monthly_mortgages,
        // desired_rent,
        // recommended_rent 
    }
}

export default connect(mapStateToProps, {updateUserid}) (Dashboard)