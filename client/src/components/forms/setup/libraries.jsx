import React from 'react'
import Axios from 'axios'

import {Form, CheckButton, Button} from '../../elements/forms'
import {Row, Column} from '../../elements/grid'

export default class SetupLibraries extends React.Component {

  constructor() {

    super()
    this.state = { libraries: [] }

  }

  componentWillMount() {

    const _this = this
    Axios.get('/api/plex-libraries')
      .then(response => _this.setState({libraries: response.data}) )

  }

  formSubmit = (e, data) => {

    e.preventDefault();

    let libraries = {}
    data.libraries.map(key => libraries[this.state.libraries[key].uuid] = this.state.libraries[key])

    if(this.props.onSubmit) this.props.onSubmit(e, libraries)

  }

  render() {

    return <Form onSubmit={(e, data) => this.formSubmit(e, data)}>
             <Row align="top">
               <Column xs="12" md="8">
                 {Object.keys(this.state.libraries).map((key, library) => 
                   <CheckButton key={key} name="libraries" type={this.state.libraries[key].type} value={key} checked={true}>
                    {this.state.libraries[key].title}
                   </CheckButton>
                 )}
               </Column>
               <Column xs="12" md="4">
                 <Button type="submit">Continue</Button>
               </Column>
             </Row>
           </Form>

  }

}