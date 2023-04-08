import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined;";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useState } from "react";
import Link from "react-router-dom";
import menuConfigs from "../../configs/menuConfigs.js";
import { themeModes } from "../../configs/themeConfigs.js";
import { setAuthModalOpen } from "../../redux/features/authModalSlice.js";
import { setThemeMode } from "../../redux/features/themeModeSlice.js";
import Logo from "./Logo.jsx";
import UserMenu from "./UserMenu.jsx";
import Sidebar from "./Sidebar.jsx";

const Topbar = () => {
    return (
        <>
        </>
    );
};

export default Topbar;