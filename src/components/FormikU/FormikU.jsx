import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";



const FormikU = (props) => {

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

/*let UsersSearchFormObjectType = {
    term: string
}*/



const submit = (values: UsersSearchFormObjectType,
                {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
};

    return (
        <div>
            <h1> Login </h1>

            <Formik
                initialValues={{term: ''}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormikU;