import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="pt-2 pt-md-6">
            <div className="header-body">
              <h2 className="display-2 text-white">Hello User</h2>
            </div>
        </div>
      </>
    );
  }
}

export default Header;
