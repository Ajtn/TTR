import React, {useState} from "react";

/*
    example props.formPattern

    [
        {fieldName: "Spell Name", input: "textbox", MouseOverText: "The name of the spell"},
        {fieldName: "Spell level", input: "select", options: [1, 2, 3, 4], MouseOverText: "The level of the spell"},
        {fieldName: "Spell components", input: "radio", options: ["material", "somatic", "verbal"], MouseOverText: "The required components of the spell"},
    ]

    
*/
export default function Form (props) {
    const [formData, setFormData] = useState([]);

    //sends form data to backend to be stored
    function sendData () {

    }

    //initialise state object used to store values of form fields
    function initFormData () {
        const tempData = {};
        props.formPattern.foreach((pattern) => {
            if (! pattern.options) {
                tempData[pattern.fieldName] = "";
            }
        });
    }

    const formBody = props.formPattern.map((pattern) => {
        if (! pattern.options) {
            return <input name={pattern.fieldName} type="text" value={props.value} onChange={props.handleChange}/>
        } 
    });
    
}