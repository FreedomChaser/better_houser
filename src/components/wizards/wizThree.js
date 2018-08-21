// import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import WizHeader from './wizHeader'
// import {updateImgUrl, updateImgAlt} from '../../ducks/reducer'

// class WizThree extends Component{
//     constructor(){
//         super()

//         this.state = {
//             img_url: '',
//             img_alt: '',
//         }
//     }
//     render(){
//         return(
//             <div>
//                 <WizHeader/>
//                 <p>Step 3</p>
//                 {/* 5 dots */}
//                 {/* output */}
//                 {/* ask about how state works with a redux method and component */}
//                 <img src={this.state.img_url} alt={this.state.img_alt} className='imgOut'/>
//                 <p>Image url</p>
//                 <input onChange={e => updateImgUrl(e.target.value)}/>
//                 <p>Image alt text</p>
//                 <input onChange={e => updateImgAlt(e.target.value)}/>
//                 <Link to='/wizardTwo'><button>Previous Step</button></Link>
//                 <Link to='/wizardFour'><button>Next Step</button></Link>
//             </div>
//         )
//     }
// }
