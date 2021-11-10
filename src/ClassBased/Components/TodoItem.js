import React from "react";
import styles from "./TodoItem.module.css"

export class TodoItem extends React.Component {
  state = {
    editing: false,
  }

  handleEditing = () => {
    this.setState({
      editing: true,
    })
    console.log("edit me :)")
  }
  handleUpdatedDone = event => {
    if (event.key === "Enter") {
      this.setState({ editing: false })
    }
  }

  render() {
    const completedStyle = {
      fontStyle: "italic",
      color: "#595959",
      opacity: 0.4,
      textDecoration: "line-through",
    }
    const { completed, id, title } = this.props.todo;
    let viewMode = {}
    let editMode = {}

    if (this.state.editing) {
      viewMode.display = "none"
    } else {
      editMode.display = "none"
    }
    return (
      // The todos data that come from the state of the TodoContainer component is passed as props using todos={this.state.todos}. Then, we accessed it through this.props.todos from within the TodosItem component
      <li  className={styles.item}>
        <div
        style={viewMode}
        onDoubleClick={this.handleEditing}
        >
          <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => this.props.handleChangeProps(id)}
          />

          <button
          onClick={() => this.props.deleteTodoProps(id)}>
            Delete
          </button>

          <span
          style={completed ? completedStyle : null}>
            {title}
          </span> 

        </div>

        <input
        style={editMode}
        type="text"
        value={title}
        className={styles.textInput}
        onChange={e => {
          this.props.setUpdate(e.target.value, id)
        }}
        onKeyDown={this.handleUpdatedDone}
        />
      </li>
    )
  }
}