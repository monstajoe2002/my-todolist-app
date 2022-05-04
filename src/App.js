import { useState,useRef,useEffect } from 'react';
import TodoList from './TodoList';
import {v4} from 'uuid';
function App() {
  const LOCAL_STORAGE_KEY='todoApp.todos'
  const [todos,setTodos]=useState([])
  const todoNameRef=useRef()
  useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos])
  function toggleTodo(id)
  {
    const newTodos=[...todos]
    const todo=newTodos.find(todo=>todo.id===id)
    todo.completed=!todo.completed
    setTodos(newTodos)
  }
  function handleAddTodo(e) {
    const name=todoNameRef.current.value
    if(name==='')return
    setTodos(prevTodos=>{
      return [...prevTodos, { id: v4(),name:name,completed:false}]
    })
    todoNameRef.current.value=null
  }
  function handleClearTodos(e)
  {
    const newTodos=todos.filter(todo=>!todo.completed)
    setTodos(newTodos)
  }
 
  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddTodo}>Add Task</button>
    <button onClick={handleClearTodos}>Clear All completed Tasks</button>
    <button>Select All</button>
    <div>{todos.filter(todo=>!todo.completed).length} task(s) left</div>
    </>
    
  );
}

export default App;
