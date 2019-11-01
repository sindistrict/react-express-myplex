import React from 'react'

export default class Home extends React.Component {

  constructor() {

    super()
    this.state = {
      users: []
    }

  }

  componentDidMount() {

    fetch('/api/servers')
      .then(response => response.json())
      .then(data => console.log(data))

  }

  render() {

    return <div>
      <h1>Home Page</h1>
      <ul>
        {this.state.users.map(user => 
        <li key={user.id}>{user.username}<br/>{user.email}<br/></li>
        )}
      </ul>
    </div>

  }

}