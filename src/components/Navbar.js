import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function NavbarComponent() {
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();
  return (
    <Navbar expand={true}>
      <Container fluid>
        <Link to="/home" className="navbar-brand">
          Car Managment
        </Link>
        <div className="leftNavContainer">
          {/* <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <span className="cartNumber">{cart.length}</span> */}
          <Button
            variant="secondary"
            onClick={(e) => {
              localStorage.removeItem("token");
              //window.location.reload(true);
              navigate("/", { replace: true });
            }}
          >
            Log Out
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
