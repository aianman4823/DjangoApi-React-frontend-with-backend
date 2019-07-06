import React from 'react';

export default class List extends React.Component{
    render(){
        if(this.props.todoList.length===0){
            return(
                <p>No List</p>
            );
        }
        const listitems = this.props.todoList.map((todoObj,index)=>{
            return(
                <li key={index} className="list_ul_li">
                    <label htmlFor="title">title: {todoObj.title}
                    <input
                        id="title"
                        type='checkbox'
                        checked={todoObj.isChecked}
                        onChange={(e)=>this.props.togglesChecked(index,e)}
                        className="input-checkbox list_checkbox"/>
                        {todoObj.body}
                    </label>
                    
                    
                    <button
                    type="button"
                    onClick={()=>this.props.togglesDone(index)}
                    className="btn">
                    {todoObj.isDone ? "Cancel":"Done"}
                    </button>
                </li>
            );
        });

        return(
            <div className="list">
                <ul className="list_ul">
                    {listitems}
                </ul>
                <button
                type="button"
                onClick={this.props.deleteTodo}
                className="btn btn_delete">Delete</button>
            </div>
        );
    }
}