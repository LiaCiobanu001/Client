import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { logo1 } from "../assets";

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {

    //API pentru autentificare
    const REACT_APP_GOOGLE_CLIENT_ID = "964800013485-aavfjcm4rtot8t0lk9n0e0a96thqkghg.apps.googleusercontent.com";

    const { mutate: login } = useLogin<CredentialResponse>({
        v3LegacyAuthProviderCompatible: true,
    });

    const GoogleButton = (): JSX.Element => {
        const divRef = useRef<HTMLDivElement>(null);

        const form = useRef();

        useEffect(() => {
            if (
                typeof window === "undefined" ||
                !window.google ||
                !divRef.current
            ) {
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    ux_mode: "popup",
                    client_id: REACT_APP_GOOGLE_CLIENT_ID,
                    callback: async (res: CredentialResponse) => {
                        if (res.credential) {
                            login(res);
                        }
                    },
                });
                window.google.accounts.id.renderButton(divRef.current, {
                    theme: "filled_blue",
                    size: "medium",
                    type: "standard",
                });
            } catch (error) {
                console.log(error);
            }
        }, []); 

        return <div ref={divRef} />;
    };



    return (
        <Box component="div" sx={{ backgroundColor: "#FCFCFC" }}>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div >
                        <img src={logo1} alt="Logo" width="340px" />
                    </div>
                    <Box mt={4}>
                        <GoogleButton />

                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
