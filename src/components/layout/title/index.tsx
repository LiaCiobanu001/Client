import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";
import { logo, logo1 } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img src={logo} alt="logo" width="28px" />
                ) : (
                    <img src={logo1} alt="logo1" width="140px" />
                )}
            </Link>
        </Button>
    );
};
