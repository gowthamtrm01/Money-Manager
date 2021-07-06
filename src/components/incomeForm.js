import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { incomeContext } from '../index';


const IncomeForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { dispatch } = useContext(incomeContext);

    const onSubmitValue = (data) => {
        dispatch({
            type: "ADD-INCOME",
            payload: data
        })
        console.log(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmitValue)}>
            <Form.Group>
                <Form.Label>Income</Form.Label>
                <Form.Control {...register("amount", { required: true })} type="number" ></Form.Control>
                {errors.amount && errors.amount.type === 'required' && <span className="warning">Income is required</span>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control {...register("description", { required: true })} type="text" ></Form.Control>
                {errors.description && errors.description.type === 'required' && <span className="warning">Description is required</span>}
            </Form.Group>
            <Form.Group>
                <Button variant="primary" type="submit" className="button">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
}

export default IncomeForm;