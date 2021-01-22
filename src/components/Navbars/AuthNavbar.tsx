import React from "react";
import Link from "next/link";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <Link href="/admin/dashboard">
              <span>
                <NavbarBrand href="#pablo">
                  <img
                    alt="..."
                    src={require("assets/img/brand/nextjs_argon_white.png")}
                  />
                </NavbarBrand>
              </span>
            </Link>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
