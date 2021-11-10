import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodosList } from './TodosList';
import { Header } from './Header';
import { InputTodo } from './InputTodo';

class TodoContainer extends React.Component {
  state = {
    todos: [],
  };
  handleChange = id => {
    this.setState(prevState => ({
      //this.state can be used but React does not guarantee that this.state written within the setState() is up-to-date. It may batch or defer the update until later.
      //It didn't worb because of React.StrictMode in the index.js file
      //At the moment, we were updating the checked value in the state directly through todo.complete = !todo.completed. The strict-mode doesn’t like that.
      todos: prevState.todos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      }),
    }))
  };
  deleteTodo = id => {
    this.setState({
      todos: [
        // With the filter() method, we are saying that for each of the todos data that we are looping through, we want to retain the once whose id is not equal to the id passed in.
        // Please note the spread operator (…) in the code. It allows us to grab the current todos item(s) at every point. As this is necessary for the code to work.
        ...this.state.todos.filter(todo => {
          return todo.id !== id;
        })
      ]
    })
  }
  addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed:false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }
  setUpdate = (updatedTitle, id) => {
  this.setState({
    todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.title = updatedTitle
      }
      return todo
    }),
  })
  }
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    // .then(response => response.json())
    // .then(data => this.setState({ todos: data }));
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }
  componentWillUnmount() {
    console.log("Help!!")
  }

  render() {
    return (
      // You cannot return more than one JSX element next to each other except you wrap them in a single element. In our case, we wrapped them inside a <div>. But in case you don’t want a redundant wrapper around your element, you can wrap everything in a React Fragment (a virtual element that doesn’t get shown in the DOM).

      // For instance, use <React.fragment> (or use shortcut, <></>) instead of <div>.
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
          todos={this.state.todos}
          handleChangeProps={this.handleChange}
          deleteTodoProps = {this.deleteTodo}
          setUpdate={this.setUpdate}
          />
        </div>
      </div>
    )
  }
}
export default TodoContainer