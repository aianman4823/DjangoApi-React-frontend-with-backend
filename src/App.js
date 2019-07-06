import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';
import List from './List';

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
const endPointUrl='http://localhost:8000/api/'

class App extends Component{
  constructor(props){
    super(props)
    this.getTodos=this.getTodos.bind(this);
    this.addTodos=this.addTodos.bind(this);
    this.deleteTodo=this.deleteTodo.bind(this);
    this.togglesChecked=this.togglesChecked.bind(this);
    this.togglesDone=this.togglesDone.bind(this);

    this.state={
      todoList:[]
    }
  }

  componentDidMount(){
    this.getTodos();
  }

  getTodos(){
    axios.get(endPointUrl)
    .then(res=>{
      console.log(res)
      this.setState({todoList:res.data});
    })
    .catch(err=>{
      console.log(err);
    });
  }

  addTodos(todoTitle,todoText){
    axios.post(endPointUrl,{
      title:todoTitle,
      body: todoText,
      isDone:false,
      isChecked:false,
    }).then(res=>{
      this.getTodos();
    }).catch(err=>{
      console.log(err);
    });
  }

  deleteTodo(){
    const newState=this.state.todoList.filter((todoObj,index)=>{
      if (todoObj.isChecked){
        axios.delete(`${endPointUrl}${todoObj.id}`)
          .then(res=>{
            console.log(res);
          }).catch(err=>{
            console.log(err);
          });
      }
      return !todoObj.isChecked;
    });
    this.setState({
      todoList:newState,
    });
  }

  togglesChecked(index){
    const newTodoList=this.state.todoList;
    newTodoList[index].isChecked=!this.state.todoList[index].isChecked;
    this.setState({
      todoList:newTodoList,
    });
  }

  togglesDone(index){
    axios.put(`${endPointUrl}${this.state.todoList[index].id}/`,{
      title:this.state.todoList[index].title,
      body: this.state.todoList[index].body,
      isDone: !this.state.todoList[index].isDone,
      isChecked:this.state.todoList[index].isChecked,
    }).then(res=>{
      this.getTodos();
    }).catch(err=>{
      console.log(err);
    });
  }

  render(){
    return(
      <div className="todo">
        <h1 className="todo_title">React ToDo App</h1>
        <Form
         addTodo={this.addTodos}/>
        <h2>ToDo List</h2>
        <List
         todoList={this.state.todoList}
         deleteTodo={this.deleteTodo}
         togglesChecked={this.togglesChecked}
         togglesDone={this.togglesDone}
         />
      </div>
    );
  }
}
export default App;