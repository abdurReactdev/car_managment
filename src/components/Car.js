import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Layout from "./Layout";
import Delete from '../Photos/delete.svg'
import Pencil from '../Photos/edit.svg'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


function Car() {
    const columns = [
        { dataField: 'id', text: 'id', sort: true },
        { dataField: 'regNo', text: 'Reg. No.', sort: true },
        { dataField: 'color', text: 'Color', sort: true },
        { dataField: 'model', text: 'Model', sort: true },
        { dataField: 'make', text: 'Make', sort: true },
        {
            dataField: 'categories', text: 'Categories',
            formatter: (cell, row) => {
                const cat = carCatogaries.filter(item => item.id === row.categories)
                console.log(carCatogaries)
                return (
                    <span>{cat.length === 0 ? '' : cat[0].name}</span>
                )
            }
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: (cell, row) => {
                return (
                    <div>
                        <img src={Delete} onClick={() => {
                            dispatch({
                                type: "Remove_Car",
                                payload: row.id
                            })
                        }} />
                        <img src={Pencil} onClick={() => {
                            setUpdate(true)
                            setCar({
                                id: row.id,
                                color: row.color,
                                model: row.model,
                                make: row.make,
                                regNo: row.regNo,
                                categories: row.categories,
                        })
                        }} />
                    </div>
                )
            }
        }
    ]
    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];
    const carCatogaries = useSelector(state => state.catogaryData)
    const carData = useSelector(state => state.cars)
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const intialValue = {
        id: carData.length + 1,
        color: '',
        model: '',
        make: '',
        regNo: '',
        categories: '',
    }
    const [car, setCar] = useState(intialValue)
    console.log(car)
    const onChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }
    return (<Layout>
        <div className="mt-3 custom-container">
            <h3 className="form-heading">
                ADD/Update Cars
            </h3>
            <Form onSubmit={
                (e) => {
                    e.preventDefault()
                    if (update) {
                        dispatch({
                            type: "Update_Cars",
                            payload: car
                        })
                        setUpdate(false)
                        setCar(intialValue)
                    } else {
                        dispatch({
                            type: "ADD_Car",
                            payload: car,
                        })
                        setCar(intialValue)
                        navigate("/home", { replace: true });
                    }
                }
            }>
                <Row className="p-3">
                    <Col md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" name="color" value={car.color} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="model" value={car.model} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Make</Form.Label>
                            <Form.Control type="text" name="make" value={car.make} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Registration No.</Form.Label>
                            <Form.Control type="text" name="regNo" value={car.regNo} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Categories</Form.Label>
                            <Form.Select  onChange={(e) => {
                                setCar({...car,categories: e.target.value * 1})
                                console.log(e.target.value)
                            }}>
                                <option >Please select categories</option>
                                {carCatogaries.map((item, index) => {
                                    return (<option key={index} value={item.id} selected={item.id === car.id ? true : false}>{item.name} </option>)
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="button-container">
                    <Button type="submit" className="mb-3">{update ? "Update" : "Create"}</Button>
                </div>
            </Form>
        </div>
        <div className="custom-container mt-5">
            <BootstrapTable bootstrap4 keyField='id' data={carData} columns={columns} defaultSorted={defaultSorted}/>
        </div>
    </Layout >);
}

export default Car;