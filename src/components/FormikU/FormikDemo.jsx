import React from "react";
import { Formik, Field, Form } from "formik";
import BasicFormSchema from "./BasicFormSchema";


const FormikDemo = () => {

    return (
        <>
            <div className="container">
                <h1>Sign up</h1>
                <Formik
                    //инициализируем значения input-ов
                    initialValues={{
                        email: "",
                        username: "",
                        password: ""
                    }}
                    //подключаем схему валидации, которую описали выше
                    validationSchema={BasicFormSchema}
                    //определяем, что будет происходить при вызове onsubmit
                    onSubmit={values => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                        }, 500);
                    }}
                    //свойство, где описывыем нашу форму
                    //errors-ошибки валидации формы
                    //touched-поля формы, которые мы "затронули",
                    //то есть, в которых что-то ввели
                    render={({ errors, touched }) => (
                        <Form className="form-container">
                            <label htmlFor="email">Email</label>
                            <Field
                                name="email"
                                placeholder="mtarasov777@gmail.com"
                                type="email"
                            />

                            {//если в этом поле возникла ошибка и
                                //если это поле "затронуто, то выводим ошибку
                                errors.email &&
                                touched.email && <div className="field-error">{errors.email}</div>}

                            <label htmlFor="username">Username</label>
                            <Field name="username" placeholder="snapoak" type="text" />

                            {errors.username &&
                            touched.username && (
                                <div className="field-error">{errors.username}</div>
                            )}

                            <label htmlFor="password">Password</label>
                            <Field name="password" placeholder="123456qwe" type="password" />

                            {errors.password &&
                            touched.password && (
                                <div className="field-error">{errors.password}</div>
                            )}

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                />
            </div>

        </>
    );
}

export default FormikDemo;