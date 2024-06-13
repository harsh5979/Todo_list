import { useState, useRef, useEffect } from "react";
import "../App.css";
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

  todos.reverse();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleadd();
    }
  };

  return (
    <div className="">
      <div className="md:container  text-black m-auto  md:w-1/2 md:min-h-[647px]  min-h-[799px]   py-5 rounded">
        <div className="todo ">
          <h1 className="text-center text-4xl font-sans my-6 mb-3">TODO-APP</h1>
          <h1 className="text-xl mt-6 font-semibold  mb-2 mx-3 select-none">
            <li> Add Todos</li>
            
          </h1>
          <input
            type="text"
            ref={inputref}
            onKeyDown={handleKeyPress}
            onChange={handlinginput}
            value={todo}
            className="outline-dotted md:w-[590px] w-[90vw] px-4 py-1 mx-4 my-3 rounded  h-[6vh] text-2xl"
          />
          <button
            onClick={handleadd}
            className="outline-dashed bg-purple-500  rounded-md px-7 py-1 md:mx-3 hover:bg-slate-700 hover:text-white font-mono font-semibold md:w-auto w-[75vw] mx-12 my-2"
          >
            Save
          </button>
        </div>
        <div className="flex m-3 p-3  ">
          <input
            className="rounded-full h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
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
        <div className="todolists mt-5">
          <h2 className="text-xl font-semibold mx-4  select-none">Todos : </h2>
          {todos.length === 0 && (
            <div className="mx-8 my-4 p-3">no todos to hare</div>
          )}
          {todos.map((item) => {
            return (
              (showfinished || !item.isComplated) && (
                <div
                  key={item.id}
                  className="todo text-center  border border-x-purple-100 p-4 mx-5 my-5 justify-between flex outline-double rounded-md "
                >
                  <input
                    type="checkbox"
                    name={item.id}
                    id=""
                    checked={item.isComplated}
                    onClick={handleCheckbox}
                    className="rounded-full h-4 w-4 "
                  />
                  <div
                    className={`text-3xl ${
                      item.isComplated ? "line-through" : ""
                    }`}
                  >
                    {item.todo}
                  </div>
                  <div className="button gap-2">
                    <button
                      onClick={(e) => handleedit(e, item.id)}
                      className="edit bg-purple-500 rounded-md px-5 py-1 mx-2 hover:bg-slate-700 hover:text-white font-mono font-semibold"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={(e) => handledelete(e, item.id)}
                      className="delete bg-purple-500 rounded-md px-5 py-1 mx-2 hover:bg-slate-700 hover:text-white font-mono font-semibold"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
