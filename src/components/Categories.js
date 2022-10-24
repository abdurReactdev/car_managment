import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Layout from "./Layout";
import Delete from '../Photos/delete.svg'
import Pencil from '../Photos/edit.svg'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function Categories() {
    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'name', text: 'Name', sort: true },
        { dataField: 'wheelType', text: 'Wheel type', sort: true },
        {
            dataField: 'action',
            text: 'Action',
            formatter: (cell, row) => {
                return (
                    <div>
                        <img src={Delete} onClick={() => {
                            dispatch({
                                type: "Remove_Categories",
                                payload: row.id
                            })
                        }} />
                        <img src={Pencil} onClick={() => {
                            console.log(update)
                            setUpdate(true)
                            setCategories(
                                {
                                    id: row.id,
                                    name: row.name,
                                    wheelType: row.wheelType
                                }
                            )
                        }} />
                    </div>
                )
            }
        }
    ]
    const defaultSorted = [{
        dataField: 'id',
        order: 'desc'
    }];
    const carCatogaries = useSelector(state => state.catogaryData)
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const intialValue = {
        id: carCatogaries.length + 1,
        name: '',
        wheelType: ''
    }
    const [categories, setCategories] = useState(intialValue)
    console.log(carCatogaries);
    const onChange = (e) => {
        setCategories({ ...categories, [e.target.name]: e.target.value })
    }
    return (<Layout>
        <div className="mt-3 custom-container">
            <h3 className="form-heading">
                Create Categories
            </h3>
            <Form onSubmit={
                (e) => {
                    e.preventDefault()
                    if (update) {
                        dispatch({
                            type: "Update_Categories",
                            payload: categories
                        })
                        setUpdate(false)
                        setCategories(intialValue)
                    } else {
                        dispatch({
                            type: "ADD_Categories",
                            payload: categories
                        })
                        navigate("/home", { replace: true });
                    }
                }
            }>
                <Row className="p-3">
                    <Col md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type="text" name="name" value={categories.name} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Wheel type</Form.Label>
                            <Form.Control type="text" name="wheelType" value={categories.wheelType} onChange={onChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="button-container">
                    <Button type="submit" className="mb-3">{update ? "Update" : "Create"}</Button>
                </div>
            </Form>
        </div>
        <div className="custom-container mt-5">
            <BootstrapTable bootstrap4 keyField='id' data={carCatogaries} columns={columns} defaultSorted={defaultSorted} />
        </div>
    </Layout >);
}

export default Categories;