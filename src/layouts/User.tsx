import React from "react";
import { useRouter } from "next/router";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "@/components/Navbars/UserNavbar";
import UserFooter from "@/components/Footers/UserFooter";
import SideBar from "@/components/Sidebar/Sidebar";

const routes = [
  {
    path: "",
    name: "Tổng quan",
    icon: "ni ni-tv-2 text-blue",
    layout: "/",
  },
  {
    path: "/fanpage",
    name: "Quản lý fanpage",
    icon: "ni ni-planet text-blue",
    layout: "",
  },
  {
    path: "/campaign",
    name: "Quản lý chiến dịch",
    icon: "ni ni-pin-3 text-orange",
    layout: "",
  },
  {
    path: "/user-plan",
    name: "Quản lý gói dịch vụ",
    icon: "ni ni-single-02 text-yellow",
    layout: "",
  },
];


function User(props) {
  // used for checking current route
  const router = useRouter();
  let mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);
  const getPageTitle = () => {
    for (let i = 0; i < routes.length; i++) {
      console.log(router.route, routes[i].layout + routes[i].path);
      if (router.route != ""  && router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
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
      <div className="main-content" ref={mainContentRef}>
        <UserNavbar {...props} brandText={getPageTitle()} />
        <div className="bg-gradient-default pb-8">
          <Container fluid className="pt-2 pt-md-6">
            {props.children}
          </Container>
        </div>
        <Container fluid>
          <UserFooter />
        </Container>
      </div>
    </>
  );
}

export default User;
