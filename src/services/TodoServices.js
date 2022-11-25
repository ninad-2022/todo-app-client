import { endpoints, API } from "../api/Index";

class TodoServices {
  static createTodo(todo) {
    return API.post(endpoints.api.todo.create, todo);
  }
  static deleteTodo(id) {
    return API.delete(endpoints.api.todo.delete + id);
  }
  static getAllTodo() {
    return API.get(endpoints.api.todo.getAll);
  }
  static deleteAllTodos() {
    return API.delete(endpoints.api.todo.delete);
  }
}
export default TodoServices;
