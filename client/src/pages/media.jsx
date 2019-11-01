import React from 'react'
import NotFound from './404'

export default class Media extends React.Component {

  render() {

    if(this.props.params.library === 'not-found') {

      return <NotFound/>

    }else{

      if(this.props.params.media === 'not-found') {

        return <NotFound/>
  
      }else{
  
        return <div><h3>Library: {this.props.params.library}</h3><br/><h3>Media: {this.props.params.media}</h3></div>
  
      }

    }

  }

}