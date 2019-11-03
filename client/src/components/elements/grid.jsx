/**
 * Import React.
 */

import React from 'react'



/** 
 * Import the component styles.
 */

import './grid.scss'



/**
 * @method Elements/Row
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [value] string
 * @param [label] string
 * @param [disabled] boolean
 * @param [required] boolean
 * @param [onChange] function
 * 
 * @return [<Row/>] Component
 */

export class Row extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}

  }

  render() {

    let classes = ['row']

    for(let prop in this.props) {

      if(prop !== 'children') classes.push(`${prop}-${this.props[prop]}`)

    }

    if(this.props.className) classes.push(this.props.className)

    return <div className={classes.join(' ')}>
            {this.props.children}
           </div>

  }

}



/**
 * @method Elements/Grids/Column
 * @description Authenticates a user via the Plex API using
 *              the provided username and password.
 * 
 * @param [value] string
 * @param [label] string
 * 
 * @return [<Column/>] Component
 */

export class Column extends React.Component {

  constructor(props) {

    super(props)
    this.state = {}

    this.state.classes = []

  }

  render() {

    let classes = ['column']

    for(let prop in this.props) {

      if(prop !== 'children') classes.push(`${prop}-${this.props[prop]}`)

    }

    if(this.props.className) classes.push(this.props.className)

    return <div className={classes.join(' ')}>
             <div className="column-inner">
               {this.props.children}
             </div>
           </div>

  }

}