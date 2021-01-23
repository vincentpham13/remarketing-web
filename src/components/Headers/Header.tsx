import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-dark pb-8 pt-2 pt-md-6">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <h1 className="display-2 text-white">Good morning! Pham</h1>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
