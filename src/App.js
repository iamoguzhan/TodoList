import React, { useState, useEffect } from 'react';
import './App.css';
import ListItems from './components/ListItems';
import firebase from './firebase';
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from 'react-perfect-scrollbar';

function App() {

  const [list, setList] = useState([]);
  const [item, setItem] = useState({
    currentItem: {
      text: "",
      key: "",
      isComplete: false,
      note: ""
    }
  });

  useEffect(() => {
    const todoRef = firebase.database().ref('Todos');
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      console.log(todos);
      const tempList = [];
      for (let task_id in todos) {
        tempList.push({ task_id, ...todos[task_id] });
      }
      console.log(tempList);
      setList(tempList);
    })
  }, []);

  function handleInput(e) {
    setItem({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
        isComplete: false,
        note: ""
      }
    })
  }

  function addItem(e) {
    e.preventDefault();
    const newItem = item.currentItem;

    if (newItem.text !== "") {
      const todoRef = firebase.database().ref("Todos");
      const todo = {
        text: newItem.text,
        key: newItem.key,
        isComplete: false,
        note: newItem.note
      };
      todoRef.push(todo);

      setItem({
        currentItem: {
          text: "",
          key: "",
          isComplete: false,
          note: ""
        }
      })
    }

  }

  const deleteItem = (task_id) => {
    const todoRef = firebase.database().ref('Todos').child(task_id);
    todoRef.remove();
  }

  function updateTask(text, task_id) {
    const todoRef = firebase.database().ref("Todos").child(task_id);
    todoRef.update({
      text: text
    });

  }

  function completeTask(task_id, isComplete) {
    const todoRef = firebase.database().ref("Todos").child(task_id);
    todoRef.update({
      isComplete: !isComplete
    });

    todoRef.child("isComplete").once("value").then(data => {
      if (data.val() !== null) {
        const isCompleted = data.val();

      }
    });

  }

  return (
    <div className="App">
      <header>
        <form className="to-do-form" onSubmit={addItem}>
          <input type="text" placeholder="New Task..."
            value={item.currentItem.text}
            onChange={handleInput} />
          <button type="submit">Add</button>
        </form>
      </header>

      <div className="listScroll">
        <PerfectScrollbar>
          <ListItems list={list}
            deleteItem={deleteItem}
            updateTask={updateTask}
            completeTask={completeTask}
          />
        </PerfectScrollbar >
      </div>

    </div>
  );
}

export default App;
