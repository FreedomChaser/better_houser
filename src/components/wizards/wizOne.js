import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updatePropertyName} from '../../ducks/reducer'
import {updatePropertyDescription, updateUserid} from '../../ducks/reducer'
import axios from 'axios'

class WizOne extends Component{
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
        if(!this.props.property_name && !this.props.property_description){
            alert('Please fill in all fields')
        }else{
           this.props.history.push('/wizardTwo') 
        }
    }
    
    render(){
        const {updatePropertyDescription, updatePropertyName} = this.props
        return(
            <body>
                <main>
                <WizHeader/>
                <div className='wizOne'>
                <div className='oneHeader'>
                <p className='oneTxt'>Step 1</p>
                </div>
                <div>
                <div className='dots'>
                <img src='step_active.png' alt='filled in green circle'/>
                <img src='step_inactive.png' alt='faded out green circle'/>
                <img src='step_inactive.png' alt='faded out green circle'/>
                <img src='step_inactive.png' alt='faded out green circle'/>
                <img src='step_inactive.png' alt='faded out green circle'/>
                </div>
                {/* 5 dots imgs */}
                <div className='oneName'>
                <p className='propName'>Property Name</p>
                <input className='nameInput' onChange={e => updatePropertyName(e.target.value)}/>
                </div>
                <div className='oneDesc'>
                <p className='propDesc'>Property Description</p>
                <input className='descInput' onChange={e => updatePropertyDescription(e.target.value)}/>
                </div>
                <div className='btnone'>
                <button className='oneBtn' onClick={() => this.formPush()}>Next Step</button>
                </div>
                </div>
                </div>
                </main>
            </body>
        ) 
    }
}

function mapStateToProps(state){
    const {userid, property_name, property_description} = state

    return{
        userid,
        property_name,
        property_description
    }
}
export default connect(mapStateToProps, {updatePropertyName, updatePropertyDescription, updateUserid}) (WizOne)