import React, { useState, useContext } from 'react';
import { Modal, Button, Tab, Tabs } from 'react-bootstrap';
import IncomeForm from '../components/incomeForm';
import ExpenseForm from '../components/expenseForm';
import { modalContext } from '../index';


const AddIncomeExpenseModal = () => {

    const [key, setKey] = useState('home');

    const { show, handleClose } = useContext(modalContext);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="home" title="Income">
                        <IncomeForm />
                    </Tab>
                    <Tab eventKey="profile" title="Expense">
                        <ExpenseForm />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default AddIncomeExpenseModal;