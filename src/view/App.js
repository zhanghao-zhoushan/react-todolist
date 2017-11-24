import React, { Component } from 'react'
import { connect } from 'react-redux'
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import { initTodo, addTodo, deleteTodo, changeIsDone, clearIsDone, checkedAll, changeIsAll } from '../reducers/todos'

class App extends Component {
  componentDidMount() {
    this.props.initTodo()
  }

  addTodo = todo => {
    this.props.addTodo(todo)
  }

  handleChangeIsDone = (index, isDone) => {
    this.props.changeIsDone({ index, isDone })
  }

  setLocalStorage = todos => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  handleDeleteTodo = index => {
    this.props.deleteTodo(index)
  }

  handleChangeCheckedAll = isAllChecked => {
    this.props.checkedAll()
  }

  clearIsDone = () => {
    this.props.clearIsDone()
  }

  render() {
    const isAllChecked = this.props.todos.isAllChecked || false
    return (
      <div>
        <TodoHeader addTodo={this.addTodo} />
        <TodoList {...this.props.todos} handleChangeIsDone={this.handleChangeIsDone} handleDeleteTodo={this.handleDeleteTodo} />
        <TodoFooter isAllChecked={isAllChecked} handleChangeCheckedAll={this.handleChangeCheckedAll} clearIsDone={this.clearIsDone} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    isAllChecked: state.isAllChecked
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initTodo: () => {
      dispatch(initTodo())
    },
    addTodo: (todo) => {
      dispatch(addTodo(todo))
    },
    deleteTodo: (todo) => {
      dispatch(deleteTodo(todo))
    },
    changeIsDone: (change) => {
      dispatch(changeIsDone(change))
    },
    clearIsDone: () => {
      dispatch(clearIsDone())
    },
    checkedAll: () => {
      dispatch(checkedAll())
    },
    changeIsAll: () => {
      dispatch(changeIsAll())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
