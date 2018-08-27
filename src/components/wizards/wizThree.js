import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateUserid, updateImgUrl, updateImgAlt} from '../../ducks/reducer'
import axios from 'axios'
// import _ from 'lodash'

class WizThree extends Component{
    constructor(){
        super()

        this.state ={
            img_url: 'https://via.placeholder.com/450x300',
            img_alt: 'preview',
        }
        this.propsToState = this.propsToState.bind(this)
    }

    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/confirmUser').then(res => {
                this.props.updateUserid(res)
            }).catch(err => {
                this.props.history.push('/')
            })
        }
    }

    propsToState(){
        this.setState({img_url: this.props.img_url, img_alt: this.props.img_alt})
    }

    render(){
        const {updateImgAlt, updateImgUrl} = this.props
       
        // let displayImg =
        return(
            <body>
            <main>
                <WizHeader/>
                <div className='wizOne'>
                <div className='oneHeader'>
                <p>Step 3</p>
                </div>
                <div className='dots'>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_active.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                </div>
                {/* output */}
                {/* fix preview box*/}
                <div className='threeImg'>
                <img src={this.state.img_url} alt={this.state.img_alt} className='imgOut'/>
                </div>
                <div className='threeInput'>
                <p className='threeUrl'>Image url</p>
                <input className='nameInput' onChange={e => updateImgUrl(e.target.value)}/>
                <p className='threeUrl'>Image alt text</p>
                <input className='nameInput' onChange={e => updateImgAlt(e.target.value)}/>
                <div className='threeBtn'>
                <Link to='/wizardTwo'><button className='twoPrev'>Previous Step</button></Link>
                <button className='previewBtn' onClick={this.propsToState}>Preview url</button>
                <Link to='/wizardFour'><button className='twoNext'>Next Step</button></Link>
                </div>
                </div>
                </div>
            </main>
            </body>
        )
    }
}

function mapStateToProps(state){
    const {userid, img_url, img_alt} = state

    return{
        userid,
        img_url,
        img_alt
    }
}

export default connect(mapStateToProps, {updateImgUrl, updateImgAlt, updateUserid}) (WizThree)
