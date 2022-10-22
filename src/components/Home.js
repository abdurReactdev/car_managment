import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Photos/1496.gif";
import { Col, Card, Row, Container } from "react-bootstrap";
import Layout from "./Layout";

function Home() {
  const dispatch = useDispatch();
  const catogaries = useSelector(state => state.catogaryData)
  console.log(catogaries)
  const [load, setLoad] = useState(true);
  useEffect(() => {
    console.log("effect");
    axios.get("https://fakestoreapi.com/products").then((res) => {
      dispatch({ type: "Fetch_All_Data", payload: res.data });
      setLoad(false);
    });
  }, []);
  return load ? (
    <div className="spinner-center">
      <img src={Spinner} alt="Spinner" />
    </div>
  ) : (
    <Layout>
      <Container fluid>
        <Row className="mt-3">
          {/*REgistered cars number card */}
          <Col xl={3} lg={3} md={6} sm={6}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Registered Cars</Card.Title>
                <Card.Text>
                  3
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={3} lg={3} md={6} sm={6}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Total Car Categories</Card.Title>
                <Card.Text>
                  {catogaries.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={3} lg={3} md={6} sm={6}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>View Car Categories</Card.Title>
                <Card.Text>
                  <Link to="/categories">View Categories</Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={3} lg={3} md={6} sm={6}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Total Car Categories</Card.Title>
                <Card.Text>
                  <Link to="/car">View Cars</Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
      <Outlet />
    </Layout>
  );
}

export default Home;
