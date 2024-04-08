import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },

  reducers: {
    addTodo: (state, action) => {
      console.log(action);
      //   concat : 기존 배열에 새로운 작업을 붙임
      state.todos = state.todos.concat(action.payload);
    },
    checkChangeTodo: (state, action) => {
      state.todos = state.todos.map((item) => ({
        ...item,
        complete:
          item.id === action.payload.id ? !item.complete : item.complete,
      }));
    },
    textChangeTodo: (state, action) => {
      state.todos = state.todos.map((item) => ({
        ...item,
        text: item.id === action.payload.id ? action.payload.text : item.text,
      }));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
    },
  },
});

//연관된 함수가 실행될 수 있게 컴포넌트에서 reducer함수를 실행할 수  있게  내보내기

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const TodoReducerActions = todoSlice.actions;

//store에서 접근할 수 있도록 내보내기

export default todoSlice.reducer;
