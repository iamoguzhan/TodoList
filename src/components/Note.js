import React, { useState, useEffect } from 'react'
import firebase from '../firebase';
import './Note.css';

function Note(props) {

    const [text, setText] = useState("");
    const task_id = props.task_id;
    const close = () => {
        props.closeNote()
    }

    useEffect(() => {
        const todoRef = firebase.database().ref('Todos').child(task_id).child("note");
        todoRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setText(data);
        })
        
    }, []);

    function save() {
        const todoReff = firebase.database().ref('Todos').child(task_id)
        todoReff.update({
            note: text
        });

        setText("");
        close();
    }

    function handleText(e) {
        setText(e.target.value);
    }

    return (
        <div className="popup">

            <div className="topBar">
                <p className="noteTxt">Note</p>
                <button className="closeBtn"
                    onClick={close}>x</button>
            </div>

            <textarea className="input" value={text} onChange={handleText}></textarea>

            <button className="save" onClick={save}>Save</button>

        </div>
    )
}
export default Note;
