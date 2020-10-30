import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import Clock from 'react-clock'
import messages from './../AutoDismissAlert/messages'

class QuestionPublic extends Component {
  constructor () {
    super()
    // setting state to an empty array and not loaded
    this.state = {
      questions: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    // making the API call
    axios.get(apiUrl + '/questions-public', {
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
          heading: 'Failed to Retrieve all Questions',
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
          <p>No Public Questions...</p>
        </div>
      )
    // if you have questions
    } else {
      jsx = (
        <div className="col-sm-10 col-md-8 mx-auto">
          {this.state.questions.map(question => (
            <div key={question._id} className='questions'>
              <Link to={`/questions/public/${question._id}`}>
                <h5 className='padding'>
                  {question.question}
                </h5>
                <p className='padding'>{question.text}</p>
              </Link>
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
            <h3>All Questions</h3>
          </span>
          <span className="d-flex flex-row-reverse">
            <Link to="/question/create">Create a new question...</Link>
          </span>
        </div>
        {jsx}
      </div>
    )
  }
}
export default withRouter(QuestionPublic)
