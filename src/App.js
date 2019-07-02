import React, { Component } from 'react';
import axios from 'axios';

// // Mockデータ
// const list = [
//   {
//     id: 1,
//     title: "1st todo",
//     description: "Learn Django properly"
//   },
//   {
//     id: 2,
//     title: "Second item",
//     description: "Learn Python."
//   },
//   {
//     id: 3,
//     title: "Learn HTTP",
//     description: "It's important."
//   }
// ]

class App extends Component{
  state={
    todos: []
  };

  componentDidMount(){
    this.getTodos();
  }

  getTodos(){
    axios.get('http://localhost:8000/api/')
    .then(res=>{
      this.setState({todos:res.data});
    })
    .catch(err=>{
      console.log(err);
    });
  }

  render(){
    return(
      <div>
        {this.state.todos.map(item=>(
          <div key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default App;