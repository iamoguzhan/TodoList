import React, { useState } from 'react';
import './ListItems.css';
import firebase from '../firebase';
import Note from './Note';

function ListItems(props) {

    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const list = props.list;

    function openNote() {
        setOpen(true);

    }

    function closeNote() {
        setOpen(false);
        setCurrentId("");
    }

    function addNote(task_id) {
        setCurrentId(task_id);
        openNote();
    }

    const changeComplete = (task_id, isComplete) => {
        props.completeTask(task_id, isComplete);
    }

    const checkNote = (id) => {

        let check = false;
        const todoRef = firebase.database().ref('Todos').child(id).child("note");
        todoRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data !== "") {
                check = true;
            }
        })

        return check;
    }

    const items = list.map(item => {

        return (

            <div className="list" key={item.key}>
                <div>

                    {
                        checkNote(item.task_id) ? <i className="fas fa-bookmark" id="bookmark" onClick={() => { addNote(item.task_id) }} />
                            : <i className="fal fa-bookmark" id="dene" onClick={() => { addNote(item.task_id) }} />
                    }

                    {" "}

                    <input className={item.isComplete ? "textLine" : null} type="text" value={item.text}
                        onChange={
                            (e) => {
                                props.updateTask(e.target.value, item.task_id)
                            }
                        } />

                    <i className="fal fa-trash-alt" id="trash" style={{ color: "lightyellow" }}
                        onClick={() => props.deleteItem(item.task_id)} />

                    {
                        !item.isComplete ? <i className="fas fa-check" id="check"
                            onClick={(e) => {
                                changeComplete(item.task_id, item.isComplete)

                            }} /> : <i className="far fa-minus-circle" id="check"
                                onClick={(e) => {
                                    changeComplete(item.task_id, item.isComplete)

                                }} />
                    }

                </div>
            </div>
        )
    })


    return (
        <div>
            {items}
            {
                open == true ?
                    <Note closeNote={closeNote}
                        task_id={currentId}
                    /> : null
            }
        </div>
    )
}

export default ListItems;