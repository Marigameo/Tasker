import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import "./App.css";
import Header from "./components/layout/Header";
import About from "./components/pages/about";
import uuid from "uuid";
import Axios from "axios";
class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    Axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5").then(res =>
      this.setState({ todos: res.data })
    );
  }

  //Toggle completed
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //delete todo
  delTodo = id => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
    // console.log(id);
    //... spread operator
  };

  //add todo
  addTodo = title => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title: title,
    //   //in ES6 if key and value are the same then we can simply put as title
    //   completed: false
    // };
    Axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    //console.log(this.state.todos);
    return (
      <Router>
        <div className="App">
          {/* take the todos items from the state and pass them as props to the todos component */}
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodos={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
