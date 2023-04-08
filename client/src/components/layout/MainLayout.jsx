import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer.jsx";
import GlobalLoading from "../common/GlobalLoading";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const MainLayout = () => {
  const dispatch = useDispatch();

  return (
    <>
    {/* global loading */}
    <GlobalLoading /> 

    {/* login modal */}

    <Box display="flex" minHeight="100vh">
      {/*header*/}

      {/*main*/}
      <Box
        component="main"
        flexGrow={1}
        overflow="hidden"
        minHeight="100vh"
      >
        <Outlet />
      </Box>

    </Box>
    <Footer />
    </>
    
  );
};

export default MainLayout