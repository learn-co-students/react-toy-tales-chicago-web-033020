import React, { Component } from 'react';

class ToyCard extends Component {

  constructor(props) {
    super()

    this.state = {
      likes: props.toy.likes
    }
  }

  updateLikesCount = (event) => {
    const toyId = this.props.toy.id
    const toyURL = `http://localhost:5000/toys/${toyId}`

    let newLikeCount = { likes: this.props.toy.likes += 1  }

    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(newLikeCount)
    }

    fetch(toyURL, configObj)
      .then(resp => resp.json())
      .then(toy => {
        this.setState({
          likes: this.props.toy.likes
        })
      })
  }

  deleteToyClick = () => {
    const toyId = this.props.toy.id
    this.props.onDeleteToyClick(toyId)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} className="toy-avatar" />
        <p>{this.state.likes} Likes</p>
        <button onClick={this.updateLikesCount} className="like-btn">Like {'<3'}</button>
        <button onClick={this.deleteToyClick} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
