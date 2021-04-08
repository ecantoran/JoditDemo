import React, {useState, useRef} from 'react';
import JoditEditor from "jodit-react";

const Report = ({}) => {
    const editor = useRef(null)
    const [content, setContent] = useState('<p>some variables: {{goo}}</p>')
    const [translate, setTranslate] = useState('')
    const [variables, setVariables] = useState([])
    const re = "(?<=\\{{)(.*?)(?=\\}})";
    const db = {
        "foo": "translate1",
        "bar": "translate2",
        "goo": "some"
    }

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    function showContent(){
        console.log("Contenido: " + content, "Editor: " + editor.current.value)
    }
    function getVariables(){
        const matches = [...editor.current.value.matchAll(re)];
        setVariables(matches)
        console.log(matches)
    }
    function replaceValues(){

        var text = editor.current.value;
        Object.keys(db).map(function (key, index){
            const newVar = '{{' + key +'}}'
            console.log(newVar)
            text = text.replace(newVar, db[key])
        })
        setTranslate(text)
        console.log(text)
    }


    return (
        <div>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                //onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />
            <button onClick={getVariables}>Show variables</button>
            <button onClick={replaceValues}>Translate text </button>
            <br/>
            <h1> Variable list</h1>
            <ul>
                {variables.map(variable => (
                    <li>{variable[0]}</li>
                ))}
            </ul>
            <h2> Translate: </h2>
            <div>
                {translate}
            </div>
        </div>

    );
}



export default Report;