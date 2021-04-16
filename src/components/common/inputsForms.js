import React from "react";
import s from "./inputsForms.module.css";
import {required} from "../../utils/validators/validators";
import {Field} from "formik";

/*const InputForms = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.inputForm + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span> {meta.error} </span>}
        </div>
    )
}*/

const InputForms = ({input, meta: {touched, error}, children, ...props}) => {

    const hasError = touched && error;
    return (
        <div className={s.inputForm + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span> {error} </span>}
        </div>
    )
}


export const Textarea = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <InputForms {...props}> <textarea {...input} {...restProps} /> </InputForms>
}

export const Input = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <InputForms {...props}> <input {...input} {...restProps} /> </InputForms>
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
};