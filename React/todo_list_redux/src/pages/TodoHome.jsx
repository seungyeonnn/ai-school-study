import React, { useState } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

const TodoHome = () => {
  return (
    <div className="todo-container">
      <h1 className="todo-tit">ToDo List</h1>
      {/* add Todo */}
      <TodoInput />

      {/* print job */}
      <TodoList title="해야할 일" checked={false} />

      {/* print done job */}
      <TodoList title="완료된 일" checked={true} />
    </div>
  );
};

export default TodoHome;
