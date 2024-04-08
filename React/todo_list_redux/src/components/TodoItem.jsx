import React, { useRef } from "react";
import { useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TodoReducerActions } from "../redux/reducers/todoSlice";

const Todoitem = ({ todo, setTodos }) => {
  let inputRef = useRef(null);
  //사용자가 입력한 텍스트를 저장하는 상태값
  const [newText, setNewText] = useState(todo.text);

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const [edited, setEdited] = useState(false);
  // edited: 사용자가 수정버튼을 눌렀는지에 대한 상태
  //true : 수정/ false:수정x

  //수정상태를 true로 변경
  const handleEditChange = () => {
    setEdited(true);
  };
  console.log(edited);

  //수정완료기능구현
  // 사용자가 수정하려는 todo가 배열 내 todo가 맞는지 체크하고 수정
  const handleSubmit = () => {
    // let updateList = todos.map((item) => ({
    //   ...item,
    //   text: item.id === todo.id ? newText : item.text,
    // }))
    dispatch(TodoReducerActions.textChangeTodo({ id: todo.id, text: newText }));
    // setTodos(updateList)
    // setEdited(false)
  };

  //사용자가 입력한 값을 newText 에 저장

  // const handleEditText = (e) =>{
  //   setNewText(e.target.value)

  // }

  const handleDelete = (id) => {
    // if (window.confirm('정말 삭제하시겠습니까?')) {
    //   console.log('삭제할 todo의 id : ', id)
    //   let updateList = todos.filter((item) => item.id !== id)

    //   setTodos(updateList)
    // }
    dispatch(TodoReducerActions.deleteTodo({ id: todo.id }));
  };

  const handleCheckChange = () => {
    //   let updateList = todos.map((item) => ({
    //     ...item,
    //     complete: item.id === todo.id ? !item.complete : item.complete,
    //   }))
    //   setTodos(updateList)
    dispatch(TodoReducerActions.checkChangeTodo({ id: todo.id }));
  };
  // complete가 현재 false인 상태

  return (
    <li className="todo-item">
      {todo.complete ? (
        <FaCheckCircle
          style={{ color: "green" }}
          className="todo-item-checkbox"
          onClick={handleCheckChange}
        />
      ) : (
        <FaRegCircle
          style={{ color: "lightgray" }}
          className="todo-item-checkbox"
          onClick={handleCheckChange}
        />
      )}

      {todo.complete ? null : edited ? (
        <button className="todo-item-submit-btn" onClick={handleSubmit}>
          👍
        </button>
      ) : (
        <button className="todo-item-edit-btn" onClick={handleEditChange}>
          🪄
        </button>
      )}

      {edited ? (
        <input
          type="text"
          className="todo-item-edit-input"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span
          className={`todo-item-content ${
            todo.complete ? "todo-item-content-checked" : ""
          }`}
        >
          {todo.text}
        </span>
      )}

      <button
        className="todo-item-edit-delete"
        onClick={() => handleDelete(todo.id)}
      >
        🗑️
      </button>
    </li>
  );
};

export default Todoitem;
