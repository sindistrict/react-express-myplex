import React from 'react'

export default class Home extends React.Component {

  constructor() {

    super()
    this.state = {
      customers: []
    }

  }

  componentDidMount() {
    fetch('/api/customers')
      .then(result => result.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched from backend:', customers)))
  }

  render() {

    return <div>
      <h1>Home Page</h1>
      <ul>
        {this.state.customers.map(customer => 
        <li key={customer.id}>{customer.fname} {customer.lname}</li>
        )}
      </ul>
    </div>

  }

}