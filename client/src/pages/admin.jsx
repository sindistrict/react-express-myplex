import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/theme-monokai'

import {Row, Column} from '../components/elements/grid'

export default class Admin extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}
    this.state.css = localStorage.getItem('css') || ''

  }

  render() {

    return <div>
      <h1>Admin Page</h1>
      <Row justify="center">
        <Column xs="12" md="6" lg="7">
        <AceEditor
      placeholder=""
      mode="css"
      theme="monokai"
      name="blah2"
      onLoad={this.onLoad}
      onChange={(css) => {
        this.setState({css})
        console.log(css)
        localStorage.setItem('css', css)
      }}
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={this.state.css}
      setOptions={{
      showLineNumbers: true,
      useWorker: false,
      tabSize: 2,
      }}/>
        </Column>
      </Row>
    </div>

  }

}