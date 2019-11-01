import React from 'react'
import {Row, Column} from '../elements/grid'
import {Form, Input} from '../elements/forms'
import {Notice} from '../elements/alerts'

export default class LoginForm extends React.Component {

  constructor(props) {

    super(props)

    this.state = { response: false, state: 'pending' }

  }

  formSubmit = (e, credentials) => {

    const _this = this

    console.log(credentials)

    _this.setState({ response: 'The form has been submitted...', state: 'loading' })
    e.preventDefault()

  }

  render() {

    return <Row justify="center">
      <Column xs="12" md="6" align="center">
        <Form onSubmit={(e, credentials) => this.formSubmit(e, credentials)}>
          <Input type="text" name="login" value=""/>
          <Input type="password" name="password" value=""/>
          {this.state.response && <Notice>{this.state.response}</Notice> }
          <button type="submit">Submit</button>
        </Form>
      </Column>
    </Row> 

  }

}