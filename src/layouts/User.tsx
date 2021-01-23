import React, { useEffect } from "react";
import { useRouter } from "next/router";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "@/components/Navbars/UserNavbar";
import UserFooter from "@/components/Footers/UserFooter";
import SideBar from "@/components/Sidebar/Sidebar";
import { authSelector, refreshTokenAsyncThunk } from "@/redux/features/auth";
import { useDispatch, useSelector } from "react-redux";

const routes = [
  {
    path: "/",
    name: "Tổng quan",
    icon: "ni ni-tv-2 text-blue",
    layout: "",
  },
  {
    path: "/quan-ly-fan-page",
    name: "Fanpage",
    icon: "ni ni-planet text-blue",
    layout: "",
  },
  {
    path: "/quan-ly-chien-dich",
    name: "Chiến dịch",
    icon: "ni ni-pin-3 text-orange",
    layout: "",
  },
  {
    path: "/quan-ly-goi-dich-vu",
    name: "Gói dịch vụ",
    icon: "ni ni-single-02 text-yellow",
    layout: "",
  },
];


function User(props) {
  // used for checking current route
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContentRef.current.scrollTop = 0;
  }, []);
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.token) {
      dispatch(refreshTokenAsyncThunk());
    }
  }, []);

  useEffect(() => {
    if ((auth.status === 'failed' || !auth.isAuthenticated) && !auth.token) {
      router.push('/auth/login');
    }
  }, [auth]);

  if (auth.status !== 'succeeded') {
    return <div>Loading</div>;
  }
  
  return (
    <>
      <SideBar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("assets/img/brand/nextjs_argon_black.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <UserNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <UserFooter />
        </Container>
      </div>
    </>
  );
}

export default User;
