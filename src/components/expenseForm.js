import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { expenseContext } from '../index';

const ExpenseForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { expenseDispatch } = useContext(expenseContext);

    const onSubmit = (data) => {
        expenseDispatch({
            type: "ADD-EXPENSE",
            payload: data
        })
        console.log(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}    >
            <Form.Group>
                <Form.Label>Expense</Form.Label>
                <Form.Control {...register("amount", { required: true })} type="number" ></Form.Control>
                {errors.amount && errors.amount.type === 'required' && <span className="warning">Expense is required</span>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control {...register("description2", { required: true })} type="text" ></Form.Control>
                {errors.description2 && errors.description2.type === 'required' && <span className="warning">Description is required</span>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Division</Form.Label>
                <select {...register('Division')}>
                    <option value="office">Office</option>
                    <option value="personal">Personal</option>
                </select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Categories</Form.Label>
                <Form.Control {...register("categories", { required: true })} type="text" ></Form.Control>
                {errors.categories && errors.categories.type === 'required' && <span className="warning">Categories is required</span>}
            </Form.Group>
            <Form.Group>
                <Button variant="primary" type="submit" className="button">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
}

export default ExpenseForm;