import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined;";
import { AppBar, Box, Button, IconButton, ListItem, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useState } from "react";
// import Link from "react-router-dom";
import menuConfigs from "../../configs/menuConfigs.js";
import { themeModes } from "../../configs/themeConfigs.js";
import { setAuthModalOpen } from "../../redux/features/authModalSlice.jsx";
import { setThemeMode } from "../../redux/features/themeModeSlice.jsx";
import Logo from "./Logo.jsx";
// import UserMenu from "./UserMenu.jsx";
import Sidebar from "./Sidebar.jsx";

const ScrollAppBar = ({children, window}) => {
    const { themeMode } = useSelector((state) => state.themeMode);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
        target: window ? window() : undefined
    });

    return cloneElement(children, {
        sx: {
            color: trigger ? "text.primary" : themeMode === themeModes.dark ? "primary.contrastText" : "text.primary",
            backgroundColor: trigger ? "background.paper" : themeMode === themeModes.dark ? "transparent" : "background.paper"
        }
    });
};

const Topbar = () => {

    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);
    const { themeMode } = useSelector((state) => state.themeMode);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();

    const onSwitchTheme = () => {
        const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
        dispatch(setThemeMode(theme));
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            <ScrollAppBar>
                <AppBar elevation={0} sx={{zIndex: 9999 }}>
                    <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton
                                color="inherit"
                                sx={{ mr: 2, display: { md: "none"} }}
                                onClick={toggleSidebar}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box sx={{ display: { xs: "inline-block", md: "none"} }}>
                                <Logo />
                            </Box>
                        </Stack>

                        {/* main menu */}
                        <Box flexGrow={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
                            <Box sx={{ marginRight: "30px" }}>
                                <Logo />
                            </Box>
                            <Button>
                                
                            </Button>
                            <IconButton>

                            </IconButton>
                        </Box>
                        {/* main menu */}

                        {/*user menu*/}
                        <Stack>
                            <Button></Button>
                        </Stack>
                        {/*user menu*/}
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>
        </>
    );
};

export default Topbar;