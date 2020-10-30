import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
import messages from './../AutoDismissAlert/messages'

class CreateQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: {
        question: '',
        text: ''
      },
      createdquestionItemId: null
    }
  }

  // handleChange = event => this.setState({
  //   [event.target.name]: event.target.value
  // })

  handlePrivacy = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // Make a copy of the State
    const itemCopy = Object.assign({}, this.state.question)
    // updating the key in state with the new value the user typed in
    itemCopy.privacy = userInput
    // updating the state with our new copy
    this.setState({ question: itemCopy })
  }

  handleChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name the input field they are accessing
    const key = event.target.name

    // Make a copy of the State
    const itemCopy = Object.assign({}, this.state.question)
    // updating the key in state with the new value the user typed in
    itemCopy[key] = userInput
    // updating the state with our new copy
    this.setState({ question: itemCopy })
  }

  handleSubmit = (event) => {
    const { msgAlert } = this.props
    // preventing the default action of the SUBMIT
    event.preventDefault()
    const questionItem = this.state.question
    axios({
      url: `${apiUrl}/questions`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` },
      data: {
        question: questionItem
      }
    })
      // succesful return of data from the API call
      .then(res => this.setState({ createdquestionItemId: res.data.question._id }))
      .then(() => {
        msgAlert({
          heading: 'Create succesfull',
          message: messages.createSuccess,
          variant: 'success'
        })
      })
      .catch(() => {
        msgAlert({
          heading: 'Create Failed',
          message: messages.failure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (this.state.createdquestionItemId) {
      return <Redirect to={'/questions/'} />
    }

    const { question, text } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">

          <h3>Create Question</h3>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Question Title</Form.Label>
              <Form.Control required type="text" name="question" value={question.question} placeholder="Title" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control required type="text" name="text" value={text} placeholder="Description" onChange={this.handleChange} />
            </Form.Group>

            <Button variant="outline-primary" block type="submit">Create Question</Button>
          </Form>

        </div>
      </div>
    )
  }
}

export default CreateQuestion
