import React from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

const TodoList = ({ title, setTodos, checked }) => {
  const todos = useSelector((state) => state.todo.todos);
  // state에 접근하면 reducer의 todo에 접근, todo에 있는 프로퍼디에 연결된 todos 불러올 수 o

  return (
    <div className="todo-list">
      <h2 className="todo-list-tit">[ {title}: n개]</h2>
      <ul className="todo-list-ul">
        {todos &&
          todos.map((todo) =>
            // todos를 검토해서 null이면 아무것도 보여주지 않고 값이 있다면 map함수를 돌림
            todo.complete === checked ? (
              <TodoItem
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                checked={false}
              />
            ) : null
          )}
      </ul>
    </div>
  );
};

export default TodoList;
