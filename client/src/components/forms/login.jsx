import React from 'react'
import Axios from 'axios'

import {Form, Input, Button} from '../elements/forms'
import {Notice} from '../elements/alerts'

export default class LoginForm extends React.Component {

  constructor(props) {

    super(props)
    this.state = { notice: false }

  }

  formSubmit = (e, data) => {

    e.preventDefault()

    const _this = this

    Axios.post('/api/user-login', data).then(response => {

      localStorage.setItem('authToken', response.data.authToken)
      if(_this.props.onSubmit) _this.props.onSubmit(e, response.data)

    }).catch(error => {

      console.log(error)

    })

  }

  render() {

    return <Form onSubmit={(e, data) => this.formSubmit(e, data)}>
             <Input label="Username" type="text" name="login" value=""/>
             <Input label="Password" type="password" name="password" value=""/>
             {this.state.notice && <Notice>{this.state.notice}</Notice> }
             <Button type="submit">Sign In</Button>
           </Form>

  }

}