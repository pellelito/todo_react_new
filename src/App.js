import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./layout/Header";
import Todos from "./Todos";
import AddTodo from "./layout/AddTodo";
import About from "./pages/About";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => this.setState({ todos: res.data }));
  }
  //Toggle Complete
  markComplete = (id) => {
    console.log("click" + id);
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  //Delete Todo
  delTodo = (id) => {
    //console.log(id);
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };
  //add Todo
  addTodo = (title) => {
    //axios skickar tillbaka samma id 201 därför är den lösningen avmarkerad
    //axios
    //  .post("https://jsonplaceholder.typicode.com/todos", {
    //    title,
    //    id: uuidv4(),
    //    completed: false,
    //  })
    //  .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
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
