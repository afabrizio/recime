import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import store from './../../store.js';

const createPage_steps = React.createClass({
  render() {
    var dispatch = this.props.dispatch;
    var steps = this.props.steps;

    return (
      <div id="steps-container">
        <div className="steps-header">
          {`Step ${steps.length} of ${steps.length}`}
        </div>
        <div className="step-image">
        </div>
        <div id="todos"></div>
        <div className="step-checklist">
          <input type="text" max="64"/>
          <button type="button" onClick={ e => {this.addTodo(e)}}>Add</button>
        </div>
      </div>
    )
  },

  addTodo: function(e) {
    let steps = store.getState().steps;
    let newTodo = document.createElement('div');
    let checkBox = document.createElement('input');
    let todo = document.createElement('span');
    let deleteOption = document.createElement('span');

    checkBox.type = 'checkbox';
    checkBox.classList.add('checkbox');
    todo.textContent = e.target.parentNode.firstChild.value;
    todo.classList.add('todo');
    deleteOption.className = 'fa fa-times delete';
    deleteOption.addEventListener('mouseover', (e) => {
      e.target.style.color = 'red';
    })
    deleteOption.addEventListener('mouseout', (e) => {
      e.target.style.color = 'white';
    })
    deleteOption.addEventListener('click', (e) => {
      Array.from(document.getElementById('todos').children).forEach( (todoDiv, index) => {
        if(todoDiv.lastChild === e.target) {
          todoDiv.parentNode.removeChild(todoDiv);
          store.dispatch({type: 'DELETE_TODO', payload: {step: store.getState().steps.length, image: null, todoIndex: index}});
        }
      });
    });

    newTodo.appendChild(checkBox);
    newTodo.appendChild(todo);
    newTodo.appendChild(deleteOption);
    document.getElementById('todos').appendChild(newTodo);
    e.target.parentNode.firstChild.value = '';
    store.dispatch( {type: 'ADD_TODO', payload: {step: steps.length, image: null, todo: todo.textContent}} );
  }

});

const mapStateToProps = (state) => {
  return (
    {
      user: state.user,
      currentView: state.currentView,
      steps: state.steps
    }
  )
}

export default connect(mapStateToProps)(createPage_steps);
