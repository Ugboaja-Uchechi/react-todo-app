import React from 'react';
import { TodoItem } from './TodoItem';

export class TodosList extends React.Component {
  render() {
    return(
      // The todos data that come from the state of the TodoContainer component is passed as props using todos={this.state.todos}. Then, we accessed it through this.props.todos from within the TodosList component.
      // Whenever you map through something, a list is created. React want each child in the list to have a unique key prop. This helps React to identify which items have changed, added or removed.
      <ul>
        {this.props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleChangeProps={this.props.handleChangeProps}
            deleteTodoProps = {this.props.deleteTodoProps}
            setUpdate={this.props.setUpdate}
            />
        ))}
      </ul>
    )
  }
}