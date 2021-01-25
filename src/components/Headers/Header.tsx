import { authSelector } from '@/redux/features/auth';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const Header = () => {
  const [greeting, setGreeting] = useState('');
  const authSl = useSelector(authSelector);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour >= 12 && hour <= 17) setGreeting('Good Afternoon');
    else if (hour >= 17 && hour <= 24) setGreeting('Good Evening');
  }, [new Date()]);

  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-2 pt-md-6">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <h1 className="display-2 text-white">{greeting}! {authSl.user?.name.split(' ').pop()}</h1>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
