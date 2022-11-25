import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TodoServices from "../services/TodoServices";
import "./Todo.css";
const Todo = () => {
  const [todo, setTodo] = useState({
    todo: "",
  });
  const [todoList, setTodoList] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.todo.length > 0) {
      TodoServices.createTodo(todo)
        .then((response) => {
          const message = response.data.message || "created";
          loadTodo();
        })
        .catch((err) => {
          const message = err.response.data.message || "Not created";
        });
    }
    setTodo({
      todo: "",
    });
  };

  const loadTodo = () => {
    TodoServices.getAllTodo()
      .then((response) => {
        setTodoList(response?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    loadTodo();
  }, []);

  const deleteTodo = (id) => {
    TodoServices.deleteTodo(id)
      .then((res) => {
        console.log("delete res", res);
        loadTodo();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteAllTodo = () => {
    TodoServices.deleteAllTodos()
      .then((res) => {
        console.log("delete all", res);
        loadTodo();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div>
        <main>
          <form onSubmit={handleSubmit}>
            <h1>⛅Set Todo list</h1>
            <input
              type="text"
              id="todo"
              name="todo"
              placeholder="write todo"
              value={todo.todo}
              onChange={handleChange}
            />
            <input className="add-btn" value="➕" type="submit" />
          </form>
          {todoList?.map(({ todo, _id }, i) => (
            <ul key={_id + "" + i}>
              <li>{todo}</li>
              <button className="btn" onClick={() => deleteTodo(_id)}>
                ✖
              </button>
            </ul>
          ))}
          <button className="delete-btn" onClick={() => deleteAllTodo()}>
            Clear Todo 😎
          </button>
        </main>
      </div>
    </>
  );
};

export default Todo;
