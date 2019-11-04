import React from 'react'
import Axios from 'axios'

import {Redirect} from 'react-router-dom'

import LoginForm from '../components/forms/login'
import SetupServers from '../components/forms/setup/servers'
import SetupLibraries from '../components/forms/setup/libraries'

import {Button} from '../components/elements/forms'
import {Row, Column} from '../components/elements/grid'

import './setup.scss'

export default class Setup extends React.Component {

  constructor() {

    super()
    this.state = {}
    this.state.step = parseInt(localStorage.getItem('setup_step')) || 0
    this.state.authToken = localStorage.getItem('authToken') || false
    this.state.imported = ''

  }


  LoginSuccess(e, data) {

    const _this = this

    Axios.post('/api/setup-owner', data).then(response => {

      localStorage.setItem('setup_step', 1)
      _this.setState({step: 1})

    }).catch(error => {

      console.log(error)

    })

  }


  ServerSuccess(e, data) {

    const _this = this

    Axios.post('/api/setup-server', data).then(response => {

      localStorage.setItem('setup_step', 2)
      _this.setState({step: 2})

    }).catch(error => {

      console.log(error)

    })

  }


  LibrariesSuccess(e, libraries) {

    const _this = this

    Axios.post('/api/setup-libraries', libraries).then(data => {

      // Object.keys(libraries).map(key => {

      //   const library = libraries[key]

      //   Axios.post('/api/plex-media', {key: library.key}).then(media => {

      //     console.log(media)
  
      //   })

      // })

      // localStorage.setItem('setup_step', 3)
      // _this.setState({step: 3})

    }).catch(error => {

      console.log(error)

    })

  }


  ConfigureSuccess(e) {

    const _this = this

    Axios.post('/api/setup-finish', {authToken: this.state.authToken}).then(() => {

      localStorage.removeItem('setup_state')
      _this.setState({step: 'complete'})

    }).catch(error => {

      console.log(error)

    })

  }


  render() {

    if (this.state.step === 'complete') {

      return <Redirect to='/'/>

    }

    return <div>
             <nav id="setup-progress">
               <ul>
                <li state={ this.state.step === 0 ? 'active' : (this.state.step > 0 ? 'complete' : 'inactive') }>Sign Into Plex</li>
                <li state={ this.state.step === 1 ? 'active' : (this.state.step > 1 ? 'complete' : 'inactive') }>Select Plex Server</li>
                <li state={ this.state.step === 2 ? 'active' : (this.state.step > 2 ? 'complete' : 'inactive') }>Import Plex Libraries</li>
               </ul>
             </nav>
             <Row justify="center">
               <Column xs="12" md="6" lg="4" align="center">
                 {this.state.step === 0 && <LoginForm onSubmit={(e, data) => this.LoginSuccess(e, data)}/> }
                 {this.state.step === 1 && <SetupServers onSubmit={(e, data) => this.ServerSuccess(e, data)}/> }
                 {this.state.step === 2 && <SetupLibraries onSubmit={(e, data) => this.LibrariesSuccess(e, data)}/> }
                 {this.state.step === 3 && <div>
                   <h1>You're all set!</h1>
                   <Button onClick={(e) => this.ConfigureSuccess(e)}>View Dashboard</Button>
                 </div> }
               </Column>
             </Row> 
           </div>

  }

}