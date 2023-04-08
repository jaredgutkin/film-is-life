import { Typography, useTheme } from "@mui/material";

const Logo = () => {
    const theme = useTheme();

    return (
        <Typography fontWeight="700" fontSiza="1.7rem">
            Bao Bao <span style={{ color: theme.palette.primary.main }}>& Meow Meow</span>
        </Typography>
    );
};

export default Logo;