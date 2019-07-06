import React from 'react';

export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            todoTitle:'',
            todoText:'',
        };

        this.todoTitleChange=this.todoTitleChange.bind(this);
        this.todoTextChange=this.todoTextChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);


    }
    
    todoTitleChange(e){
        this.setState({
            todoTitle:e.target.value,
        });
    }

    todoTextChange(e){
        this.setState({
            todoText:e.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.todoText === '' || this.state.todoTitle===""){
            return;
        }
        this.setState({
            todoTitle:'',
            todoText: '',
        });
        this.props.addTodo(this.state.todoText,this.state.todoTitle);
    }

    render(){
        return(
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form_items">
                    <label htmlFor="title" >title: </label>
                    <input id="title"  type="text" value={this.state.todoTitle} onChange={this.todoTitleChange} className="input_form"/>
                    <br/>
                    <label htmlFor="content" >text: </label>
                    <input id="content" type="text" value={this.state.todoText} onChange={this.todoTextChange} className="input_form"/>
                        
                    <button type="submit" className="btn form_btn">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}