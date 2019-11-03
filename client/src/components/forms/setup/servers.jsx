import React from 'react'
import Axios from 'axios'

import {Form, Select, Button} from '../../elements/forms'
import {Row, Column} from '../../elements/grid'

export default class SetupServers extends React.Component {

  constructor() {

    super()
    this.state = { servers: [] }

  }

  componentWillMount() {

    const _this = this

    Axios.get('/api/plex-servers')
      .then(response => _this.setState({servers: response.data}) )

  }

  formSubmit = (e, data) => {

    let key = parseInt(data.servers)
    let server = this.state.servers[key]

    e.preventDefault()
    if(this.props.onSubmit) this.props.onSubmit(e, server)

  }

  render() {

    return <Form onSubmit={(e, data) => this.formSubmit(e, data)}>
             <Row align="top">
               <Column xs="12" md="8">
                 <Select name="servers">
                   {Object.keys(this.state.servers).map((key, server) => <option key={key} value={key}>{this.state.servers[key].name}</option> )}
                 </Select>
               </Column>
               <Column xs="12" md="4">
                 <Button type="submit">Continue</Button>
               </Column>
             </Row>
           </Form>

  }

}