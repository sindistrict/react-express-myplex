import React from 'react'
import Axios from 'axios'

import {Form, CheckButton, Button, Progress} from '../../elements/forms'
import {Row, Column} from '../../elements/grid'

export default class SetupLibraries extends React.Component {

  constructor() {

    super()
    this.state = {}
    this.state.libraries = []
    this.state.imported = []

    this.state.importsComplete = 0

  }

  componentWillMount() {

    const _this = this
    Axios.get('/api/plex-libraries')
      .then(response => _this.setState({libraries: response.data}) )

  }

  async ImportMedia(library, media) {

    const _this = this

    let status = 0
    let imported = this.state.imported

    for(const [i, item] of Object.entries(media)) {

      const promise = await Axios.post('/api/plex-media', {key: item.key}).then(response => {

        let mediaTitle = ''

        if(library.type === 'movie') mediaTitle = response.data.Metadata[0].title
        if(library.type === 'show')  mediaTitle = response.data.parentTitle

        status++
        imported[library.type] = {status, total: Object.keys(media).length, type: library.title, title: mediaTitle}

        let importsComplete = _this.state.importsComplete
        if(status === Object.keys(media).length) importsComplete = importsComplete + 1
        
        _this.setState({imported, importsComplete})

        return response.data

      })

      console.log(promise)

    }

  }

  async ImportLibraries(libraries) {

    this.setState({importsComplete: 0})

    let imported = this.state.imported

    for(const [i, library] of Object.entries(libraries)) {

      const media = await Axios.post('/api/plex-library', {key: library.key}).then(response => {

        return response.data

      })

      imported[library.type] = {status: 0, total: Object.keys(media).length, type: library.title, title: ''}

      this.setState({imported})
      
      this.ImportMedia(library, media)

    }

  }

  formSubmit = (e, data) => {

    e.preventDefault();

    let libraries = {}
    data.libraries.map(key => libraries[this.state.libraries[key].uuid] = this.state.libraries[key])

    if(this.state.importsComplete < Object.keys(this.state.libraries).length) {

      this.ImportLibraries(libraries)

    }else{

      if(this.props.onSubmit) this.props.onSubmit(e, libraries)

    }

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
                 <Button type="submit">{this.state.importsComplete <= Object.keys(this.state.imported).length ? "Import" : "Continue"}</Button>
               </Column>
             </Row>
             <Row>
               <Column xs="12">
                 {this.state.importsComplete < Object.keys(this.state.imported).length &&
                  <div>
                    {Object.keys(this.state.imported).map((key, status) =>
                    <div key={key+this.state.imported[key].status}>
                    <p>{this.state.imported[key].status} / {this.state.imported[key].total} {this.state.imported[key].type}</p>
                    <Progress value={this.state.imported[key].status} max={this.state.imported[key].total}/>
                    <small>{this.state.imported[key].title}</small>
                    </div>)}
                  </div>
                  }
                 
               </Column>
             </Row>
           </Form>

  }

}