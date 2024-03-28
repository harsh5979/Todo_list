import { useState, useRef, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const inputref = useRef(null);
  const [showfinished, setshowfinished] = useState(false);

  const togglefinished = () => {
    setshowfinished(!showfinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));

      settodos(todos);
    }
  }, []);

  const saveTols = (updatetodos) => {
    localStorage.setItem("todos", JSON.stringify(updatetodos));
  };

  const handlinginput = (e) => {
    settodo(e.target.value);
    saveTols();
  };
  // const handleadd = () => {
  //   settodos([...todos, { id: uuidv4(), todo, isComplated: false }]);
  //   saveTols();
  //   let data = todo;
  //   data.trim();
  //   if (data.length == 0) {
  //     inputref.current.focus();
  //   } else if (data.length != 0) {
  //     settodo("");
  //     inputref.current.focus();
  //   }
  // };
  const handleadd = () => {
    if (todo.trim() !== "") {
      const newTodo = { id: uuidv4(), todo, isComplated: false };
      settodos((prevTodos) => {
        const newTodos = [...prevTodos, newTodo];
        saveTols(newTodos);
        return newTodos;
      });
      settodo("");
      inputref.current.focus();
    } else {
      inputref.current.focus();
    }
  };

  const handleedit = (e, id) => {
    let t = todos.filter((i) => i.id == id);
    settodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    inputref.current.focus();

    settodos(newtodos);
    saveTols(newtodos);
  };

  const handledelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    saveTols(newtodos);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((index) => {
      return index.id == id;
    });

    let newtodos = [...todos];
    newtodos[index].isComplated = !newtodos[index].isComplated;
    settodos(newtodos);
    saveTols(newtodos);
  };

  return (
    <>
      <Navbar />

      <div className="md:container bg-gray-300 m-auto  md:w-1/2 md:min-h-[680px]  min-h-[799px] my-2  py-5 rounded">
        <div className="todo ">
          <h1 className="text-center text-3xl font-serif my-3 mb-3">
            TODO List Demo App
          </h1>
          <h1 className="text-xl mt-6 font-semibold  mb-2 mx-3 select-none">
            <li>add Todos</li>
          </h1>
          <input
            type="text"
            ref={inputref}
            onChange={handlinginput}
            value={todo}
            className="md:w-[590px] w-[90vw] px-4 py-1 mx-4 my-3 rounded  h-[5vh]"
          />
          <button
            onClick={handleadd}
            className="bg-purple-500  rounded-md px-7 py-1 md:mx-3 hover:bg-slate-700 hover:text-white font-mono font-semibold md:w-auto w-[75vw] mx-9 my-2"
          >
            Save
          </button>
        </div>
        <div className="flex m-3 p-3  ">
          <input
            type="checkbox"
            name=""
            id=""
            checked={showfinished}
            onClick={togglefinished}
          />
          <h2
            className="mx-3 cursor-pointer select-none"
            onClick={togglefinished}
          >
            Show finished
          </h2>
        </div>
        <div className="todolists mt-12">
          <h2 className="text-xl font-semibold mx-4  select-none">Todos : </h2>
          {todos.length === 0 && (
            <div className="mx-8 my-4 p-3">no todos to hare</div>
          )}
          {todos.map((item) => {
            return (
              (showfinished || !item.isComplated) && (
                <div
                  key={item.id}
                  className="todo text-center border border-x-purple-100 p-2 mx-5 my-3 justify-between flex "
                >
                  <input
                    type="checkbox"
                    name={item.id}
                    id=""
                    checked={item.isComplated}
                    onClick={handleCheckbox}
                  />
                  <div className={item.isComplated ? "line-through" : ""}>
                    {item.todo}
                  </div>
                  <div className="button gap-2">
                    <button
                      onClick={(e) => handleedit(e, item.id)}
                      className="edit bg-purple-500 rounded-md px-5 py-1 mx-2 hover:bg-slate-700 hover:text-white font-mono font-semibold"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handledelete(e, item.id)}
                      className="delete bg-purple-500 rounded-md px-5 py-1 mx-2 hover:bg-slate-700 hover:text-white font-mono font-semibold"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
