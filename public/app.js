const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
function App() {
  const [acitivity, setActivity] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [message, setMessage] = React.useState("");
  function generateId() {
    return Date.now();
  }
  function saveTodoListHandler(event) {
    event.preventDefault();
    if (!acitivity) {
      setMessage("diisi dulu dong!");
      return;
    }
    setMessage("");
    if (edit.id) {
      const updateTodo = {
        id: edit.id,
        acitivity: acitivity
      };
      const todoIndex = todos.findIndex(item => {
        return item.id == edit.id;
      });
      const updateTodos = [...todos];
      updateTodos[todoIndex] = updateTodo;
      setTodos(updateTodos);
      return cancelEditTodoHandler();
    }
    setTodos([...todos, {
      id: generateId(),
      acitivity: acitivity
    }]);
    setActivity("");
  }
  function removeTodoHandler(todoId) {
    setMessage("");
    const filterTodos = todos.filter(item => {
      return item.id !== todoId;
    });
    setTodos(filterTodos);
    if (edit.id) cancelEditTodoHandler();
  }
  function editTodoHandler(todo) {
    setMessage("");
    setActivity(todo.acitivity);
    setEdit(todo);
  }
  function cancelEditTodoHandler() {
    setMessage("");
    setEdit({});
    setActivity("");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Simple TODO List"), message && /*#__PURE__*/React.createElement("small", {
    style: {
      color: "red",
      fontStyle: "italic"
    }
  }, message), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveTodoListHandler
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nama aktifitas",
    value: acitivity,
    onChange: event => {
      setActivity(event.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, edit.id ? "Simpan" : "Tambah"), edit.id && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: cancelEditTodoHandler
  }, "Gajadi")), todos.length > 0 ? /*#__PURE__*/React.createElement("ul", null, todos.map(todo => {
    return /*#__PURE__*/React.createElement("li", {
      key: todo.id
    }, todo.acitivity, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: editTodoHandler.bind(this, todo)
    }, "edit"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: removeTodoHandler.bind(this, todo.id)
    }, "hapus"));
  })) : /*#__PURE__*/React.createElement("small", null, "tidak ada todo"));
}
root.render( /*#__PURE__*/React.createElement(App, null));