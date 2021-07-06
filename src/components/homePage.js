import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddIncomeExpenseModal from '../modals/addModal';
import { modalContext } from '../index';
import DashBoard from './dashBoard';

const Home = () => {

    const { handleOpen, show } = useContext(modalContext);

    return (
        <Container style={{ paddingTop: '2rem' }}>
            <Row>
                <Col>
                    <Button onClick={handleOpen}>Add</Button>
                </Col>
            </Row>
            {show && <AddIncomeExpenseModal />}
            <Row style={{ paddingTop: '1rem' }}>
                <Col>
                    <DashBoard />
                </Col>
            </Row>
        </Container>
    )
};

export default Home;