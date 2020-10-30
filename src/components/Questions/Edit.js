import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from './../AutoDismissAlert/messages'

class EditQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questionItem: {
        question: '',
        text: ''
      },
      didEdit: false,
      isLoaded: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/questions/${this.props.match.params.id}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` }
    })
      // .then(res => console.log(res))
      .then(res => this.setState({
        questionItem: res.data.question,
        isLoaded: true
      }))
      .catch(console.error)
  }

  handlePrivacy = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // Make a copy of the State
    const itemCopy = Object.assign({}, this.state.questionItem)
    // updating the key in state with the new value the user typed in
    itemCopy.privacy = userInput
    // updating the state with our new copy
    this.setState({ questionItem: itemCopy })
  }

  handleChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name the input field they are accessing
    const key = event.target.name
    // Make a copy of the State
    const itemCopy = Object.assign({}, this.state.questionItem)
    // updating the key in state with the new value the user typed in
    itemCopy[key] = userInput
    // updating the state with our new copy
    this.setState({ questionItem: itemCopy })
  }

  handleSubmit = (event) => {
    const { msgAlert } = this.props
    // preventing the default action of the SUBMIT
    event.preventDefault()
    const questionItem = this.state.questionItem
    axios({
      url: `${apiUrl}/questions/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` },
      data: {
        question: questionItem
      }
    })
      // succesful return of data from the API call
      .then(res => this.setState({ didEdit: true }))
      .then(() => {
        msgAlert({
          heading: 'Edit succesfull',
          message: messages.success,
          variant: 'success'
        })
      })
      // .then(this.forceUpdate())
      .catch(() => {
        msgAlert({
          heading: 'Failed to Edit',
          message: messages.failure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { question, text } = this.state.questionItem
    let jsx
    if (this.state.didEdit) {
      return <Redirect to={'/questions/'} />
    } else if (this.state.isLoaded === false) {
      jsx = (
        <div className="col-sm-10 col-md-8 mx-auto">
          <p>Loading...</p>
        </div>
      )
    } else {
      jsx = (
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">

            <h3>Edit Question</h3>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Question</Form.Label>
                <Form.Control required type="text" name="question" value={question} placeholder="Title" onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control required type="text" name="text" value={text} placeholder="Description" onChange={this.handleChange} />
              </Form.Group>

              <Button variant="outline-primary" block type="submit">Edit Question</Button>

            </Form>

          </div>
        </div>
      )
    }

    return (
      <Fragment>
        {jsx}
      </Fragment>
    )
  }
}

export default withRouter(EditQuestion)
