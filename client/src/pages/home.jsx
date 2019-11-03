import React from 'react'

export default class Home extends React.Component {

  constructor() {

    super()
    this.state = {
      users: []
    }

  }

  render() {

    return <div>
      <h1>Home Page</h1>
    </div>

  }

}