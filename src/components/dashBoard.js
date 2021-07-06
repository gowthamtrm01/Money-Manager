import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import BarChart from './BarChart';
import Message from './Message';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function App() {
    const [type, setType] = useState('income');
    const [filter, setFilter] = useState('yearlyExpenditure');
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [title, setTitle] = useState('');

    const onFilterChange = (event) => {
        const value = event.target.value;
        setFilter(value);
        fetchDashboardData(type, value);
    }

    const onTypeChange = (event) => {
        const value = event.target.value;
        setType(value);
        fetchDashboardData(value, filter);
    }

    useEffect(() => {
        if (xAxis.length === 0 && yAxis.length === 0) {
            try {
                const payload = {
                    type
                }
                const url = '/yearly_expenditure'
                axios.post(url, payload).then((response) => {
                    if (response && response.status === 200) {
                        console.log(response);
                        const { data } = response;
                        setXAxis(data.map((item) => item['year']));
                        setYAxis(data.map((item) => item['total']));
                        setTitle('Yearly Expenditure');
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }, [])

    const fetchDashboardData = (expenditureType, timeline) => {
        try {
            const payload = {
                type: expenditureType
            }
            if (timeline === 'yearlyExpenditure') {
                const url = '/yearly_expenditure';
                axios.post(url, payload).then((response) => {
                    if (response && response.status === 200) {
                        const { data } = response;
                        setXAxis(data.map((item) => `Year ${item['year']}`));
                        setYAxis(data.map((item) => item['total']));
                        setTitle('Yearly Expenditure');
                    }
                })
            } else if (timeline === 'monthlyExpenditure') {
                const url = '/monthly_expenditure'
                axios.post(url, payload).then((response) => {
                    if (response && response.status === 200) {
                        const { data } = response;
                        setXAxis(data.map((item) => `${months[item['month']]}-${item['year']}`));
                        setYAxis(data.map((item) => item['total']));
                        setTitle('Monthly Expenditure');
                    }
                })
            } else if (timeline === 'weeklyExpenditure') {
                const url = '/weekly_expenditure';
                axios.post(url, payload).then((response) => {
                    if (response && response.status === 200) {
                        const { data } = response;
                        setXAxis(data.map((item) => `Week-${item['week']} ${item['year']}`));
                        setYAxis(data.map((item) => item['total']));
                        setTitle('Weekly Expenditure');
                    }
                })
            } else {
                console.log('Invalid timeline', timeline);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container style={{ paddingTop: '2rem' }}>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Type </Form.Label>
                        <Form.Control as="select" onChange={onTypeChange} value={type}>
                            <option value='income'>Income</option>
                            <option value='expense'>Expense</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Filter </Form.Label>
                        <Form.Control as="select" onChange={onFilterChange} value={filter}>
                            <option value='yearlyExpenditure'>Yearly Expenditure</option>
                            <option value='monthlyExpenditure'>Monthly Expenditure</option>
                            <option value='weeklyExpenditure'>Weekly Expenditure</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row style={{ paddingTop: '1rem' }}>
                <Col md={12}>
                    {(xAxis.length === 0 && yAxis.length === 0) ?
                        (<Message variant={'info'}>No Data Available</Message>) : (
                            <BarChart
                                xAxis={xAxis}
                                yAxis={yAxis}
                                title={title}
                            />
                        )}
                </Col>
            </Row>
        </Container>
    );
}

export default App;
