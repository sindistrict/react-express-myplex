/**
 * Import React.
 */

import React from 'react'



/** 
 * Import the component styles.
 */

import './alerts.scss'



/**
 * @method Elements/Alerts
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [value] string
 * @param [label] string
 * @param [disabled] boolean
 * @param [required] boolean
 * @param [onChange] function
 * 
 * @return [<Alert/>] Component
 */

export class Notice extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}
    this.state.visible = 'false'

  }

  render() {

    setTimeout(() => {

      this.setState({ visible: 'true' })

    }, 1000)

    return <div 
             id={this.props.id || ''}
             visible={this.state.visible}
             className="alert notice">
             <span>{this.props.children}</span>
           </div>

  }

}