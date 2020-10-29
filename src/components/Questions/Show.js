import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import Button from 'react-bootstrap/Button'
// import messages from './../AutoDismissAlert/messages'

class ShowQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/questions/public/${this.props.match.params.id}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` }
    })
      .then(res => this.setState({
        question: res.data.question,
        isLoaded: true
      }))
      .catch(console.error)
  }

  render () {
    const { question, text, _id } = this.state.question
    let jsx
    // while the questions are loading
    if (this.state.isLoaded === false) {
      jsx = (
        <div className="col-sm-10 col-md-8 mx-auto">
          <p>Loading...</p>
        </div>
      )
      // if there are no questions
    } else {
      jsx = (
        <div className="col-sm-10 col-md-8 mx-auto">
          <div key={_id} className='questions'>
            <h5 className='padding'>
              {question}
            </h5>
            <p className='padding'>{text}</p>
          </div>
        </div>
      )
    }
    // returning the list with the jsx in it
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <span>
            <h3>Help Section</h3>
          </span>
        </div>
        {jsx}
      </div>
    )
  }
}
export default withRouter(ShowQuestion)
