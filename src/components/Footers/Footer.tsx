/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © {new Date().getFullYear()}{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://bombot.vn"
                rel="noopener noreferrer"
                target="_blank"
              >
                @Bombot.vn
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://bombot.vn"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Trang chủ
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://bombot.vn/termsofservice2/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Chính sách
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://bombot.vn/PRIVACYPOLICY/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Điều khoản & Bảo mật
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
