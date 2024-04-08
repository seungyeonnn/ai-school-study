import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { TodoReducerActions } from "../redux/reducers/todoSlice";

const TodoInput = () => {
  const inputRef = useRef(null);

  // 꼭 아래 두개가 다 있을 필요는 x
  // state는 store의 reducer 객체 자체를 가리키고 .todo 해야 todo를 가져올 수 o
  const todos = useSelector((state) => state.todo.todos);
  // 요청만 하는 경우 diapatch만 있어도 o
  const dispatch = useDispatch();

  const inputClick = () => {
    let todo = inputRef.current.value;
    // setTodos([
    //   ...todos,
    //   {
    //     id: uuidv4,
    //     text: todo,
    //     complete: false,
    //   },
    // ]);
    dispatch(
      TodoReducerActions.addTodo({
        id: uuidv4,
        text: todo,
        complete: false,
      })
    );
    console.log(todos);

    // 입력된 내용을 비우고 커서 생성하기
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div className="todo-inputbox">
      <input
        type="text"
        className="todo-inputbox-input"
        placeholder="할 일을 입력해 주세요~!"
        ref={inputRef}
      />
      <input
        type="button"
        className="todo-inputbox-add-btn"
        value="등록"
        onClick={inputClick}
      />
    </div>
  );
};

export default TodoInput;
