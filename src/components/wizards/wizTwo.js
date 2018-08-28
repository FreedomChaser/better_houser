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
    zipCheck(val){
        let zipPattern = /^[0-9]+$/

        let str = val

        if(zipPattern.test(str)){
            updateZip(val)
        }else{
            alert('zip be 5 numbers')
        }
    }
    
    render(){
        const {updateAddress, updateCity, updateState, updateZip} = this.props
        
        return(
            <body>
                <main>
                <WizHeader/>
                <div className='wizOne'>
                <div className='oneHeader'>
                <p className='oneTxt'>Step 2</p>
                </div>
                <div className='dots'>
                <img src='step_completed.png' alt=''/>
                <img src='step_active.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                </div>
                {/* 5 dots */}

                <p className='propName'>Address</p>
                <input className='nameInput' onChange={e => updateAddress(e.target.value)}/>
                <div className='twoAddress'>
                <div className='twoin'>
                <p className='propName'>City</p>
                <input className='twoInput' onChange={e => updateCity(e.target.value)}/>
                </div>
                <div className='twoin'>
                <p className='propName'>State</p>
                <input className='twoInput' onChange={e => updateState(e.target.value)}/>
                </div>
                <div className='twoin'>
                <p className='propName'>Zip</p>
                <input className='twoInput' onChange={e => this.zipCheck(e.target.value)}/>
                </div>
                </div>
                <div className='twoBtns'>
                <Link to='/wizardOne'>
                    <button className='twoPrev'>Previous Step</button>
                </Link>
                <button className='twoNext' onClick={() => this.formPush()}>Next Step</button>
                </div>
                </div>
                </main>
            </body>
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