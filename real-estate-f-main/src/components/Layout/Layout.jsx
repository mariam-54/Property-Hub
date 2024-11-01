/* eslint-disable react/prop-types */
// import Container from "@mui/material/Container";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Box } from "@mui/material";

const Layout = (props) => {
  return (
    <>
      <Header />
        <Box sx={{marginTop:{xs:"4em", md:"5em"}}}>{props.children}</Box>
      {/* <Container minwidth="sm">
      </Container> */}
      <Footer />
    </>
  );
};

export default Layout;
