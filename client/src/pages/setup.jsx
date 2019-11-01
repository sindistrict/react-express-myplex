import React from 'react'

export default class Setup extends React.Component {

  constructor() {

    super()
    this.state = {
      servers: []
    }

  }

  componentDidMount() {

    fetch('/api/servers')
      .then(response => response.json())
      .then(servers => this.setState({servers}))

  }

  render() {

    return <div>
      <h1>Setup Page</h1>
      <select>
        <option>Select a server</option>
        {this.state.servers.map(server => 
        <option key={server.machineIdentifier}>{server.name}</option>
        )}
      </select>
    </div>

  }

}