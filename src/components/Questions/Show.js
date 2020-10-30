import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
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

  // handleChange = (event) => {
  //   // get the value that the user typed in
  //   const userInput = event.target.value
  //   // get the name the input field they are accessing
  //   const key = event.target.name
  //   // Make a copy of the State
  //   const itemCopy = Object.assign({}, this.state.question)
  //   // updating the key in state with the new value the user typed in
  //   itemCopy.comments[key] = userInput
  //   // updating the state with our new copy
  //   this.setState({ question: itemCopy })
  // }

  handleSubmit = (event) => {
    // const { msgAlert } = this.props
    // preventing the default action of the SUBMIT
    event.preventDefault()
    // const questionItem = this.state.question
    // axios({
    //   url: `${apiUrl}/questions`,
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${this.props.user.token}` },
    //   data: {
    //     question: questionItem
    //   }
    // })
    //   // succesful return of data from the API call
    //   .then(res => this.setState({ createdquestionItemId: res.data.question._id }))
    //   .then(() => {
    //     msgAlert({
    //       heading: 'Create succesfull',
    //       message: messages.createSuccess,
    //       variant: 'success'
    //     })
    //   })
    //   .catch(() => {
    //     msgAlert({
    //       heading: 'Create Failed',
    //       message: messages.failure,
    //       variant: 'danger'
    //     })
    //   })
  }

  render () {
    const { question, text } = this.state.question
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
          <div className='questions'>
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
