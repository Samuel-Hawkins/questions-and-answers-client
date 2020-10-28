import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import Clock from 'react-clock'
import messages from './../AutoDismissAlert/messages'

class QuestionIndex extends Component {
  constructor () {
    super()
    // setting state to an empty array and not loaded
    this.state = {
      questions: [],
      isLoaded: false,
      didDelete: false,
      didAnswer: false
    }

    this.onCompleted = this.onCompleted.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount () {
    const { msgAlert } = this.props
    // making the API call
    axios.get(apiUrl + '/questions', {
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
    // taking the response and setting state to the response
      .then(response => {
        this.setState({
          isLoaded: true,
          questions: response.data.questions
        })
      })
      // catching any errors
      .catch(() => {
        msgAlert({
          heading: 'Failed to Retrieve your personal Questions',
          message: messages.failure,
          variant: 'danger'
        })
      })
  }

  onCompleted (event) {
    const { msgAlert } = this.props
    // Set questions = the value of this.state.questions (ALL BUCKETS)
    const questions = this.state.questions
    // Find the specific question that was clicked on
    const question = questions.find(el => el._id === event.target.id)
    // Find the index within the questions array of the question that was clicked on
    const questionIndex = questions.indexOf(question)
    // create a copy of the specific question so that we can use it to change state
    const itemCopy = Object.assign({}, question)
    // toggling the state of complteed within the copy
    itemCopy.answered = !question.answered
    // updating the state with our new copy
    axios({
      url: `${apiUrl}/questions/${event.target.id}`,
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` },
      data: {
        question: itemCopy
      }
    })
      // Use the index to set the question that was clicked on to our copy
      .then(() => {
        this.setState(questions[questionIndex] = itemCopy)
        msgAlert({
          heading: 'Question marked as answered',
          message: messages.success,
          variant: 'success'
        })
      })
      .catch(() => {
        msgAlert({
          heading: 'Failed to Mark Question as answered',
          message: messages.failure,
          variant: 'danger'
        })
      })
  }

  onDelete (event) {
    const { msgAlert } = this.props

    // Set questions = the value of this.state.questions (ALL BUCKETS)
    console.log(this.state.questions)
    const questions = this.state.questions
    // Find the specific question that was clicked on
    const question = questions.find(el => el._id === event.target.id)
    // Find the index within the questions array of the question that was clicked on
    console.log(question)
    const questionIndex = questions.indexOf(question)
    // updating the state with our new copy
    axios({
      url: `${apiUrl}/questions/${event.target.id}`,
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` }
    })
      .then(() => {
        // Use the index to set the question that was clicked on to our copy
        this.setState(questions.splice(questionIndex, 1))
        msgAlert({
          heading: 'Delete succesfull',
          message: messages.success,
          variant: 'success'
        })
      })
      // .then(this.forceUpdate())
      .catch(() => {
        msgAlert({
          heading: 'Failed to Delete',
          message: messages.failure,
          variant: 'danger'
        })
      })
  }

  render () {
    let jsx
    // while the questions are loading
    if (this.state.isLoaded === false) {
      jsx = (
        <div className="col-sm-10 col-md-8 mx-auto">
          <p>Loading...</p>
        </div>
      )
      // if there are no questions
    } else if (this.state.questions.length === 0) {
      jsx = (
        <div className="col-sm-10 col-md-8 mx-auto">
          <p>You Have no Questions...</p>
        </div>
      )
    // if you have questions
    } else {
      jsx = (
        <div className="col-sm-10 col-md-8 mx-auto">
          {this.state.questions.map(question => (
            <div key={question._id}>
              <h5>
                {question.question}
              </h5>
              <p className={question.answered ? 'answered' : ''}>{question.text}</p>
              <div className='d-flex flex-row-reverse'>
                <span id={question._id} className='actions pointer' onClick={this.onDelete}>Delete</span>
                <span className='actions'><Link to={`/questions/edit/${question._id}`}>Edit</Link></span>
                <span className='actions pointer' onClick={this.onCompleted}></span>
              </div>
            </div>
          ))}
        </div>
      )
    }
    // returning the list with the jsx in it
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <span>
            <h3>Your Questions</h3>
          </span>
          <span className="d-flex flex-row-reverse">
            <Link to="/question/create">Create New question...</Link>
          </span>
        </div>
        {jsx}
      </div>
    )
  }
}
export default withRouter(QuestionIndex)
