import React from 'react'
import NotFound from './404'

export default class Library extends React.Component {

  render() {

    if(this.props.params.library === 'not-found') {

      return <NotFound/>

    }else{

      return <h3>Library: {this.props.params.library}</h3>

    }

  }

}