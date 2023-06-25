import EmailOutlined from "@mui/icons-material/EmailOutlined";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


import { AgentCardProp } from "interfaces/agent";


function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}


const AgentMessage = ({ id, name, email, avatar }: AgentCardProp) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column" },
                gap: "20px",
                padding: "20px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
                },
                borderRadius: 4,
                margin: "10px",
                alignItems: "center",
                backgroundColor: "#fcfcfc",
            }}
        >
            <img
                src={
                    checkImage(avatar)
                        ? avatar
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="user"
                width={90}
                height={90}
                style={{ borderRadius: 8, objectFit: "cover", }}

            />

            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                gap={2} >
                <Typography fontSize={18} fontWeight={600} color="#11142d" >
                    {name}
                </Typography>
            </Stack>
            {/* trimitere mail catre user */}
            <a href={`mailto:${email}?subject=Interesat de mașină&body=Bună ziua vă scriu referitor la mașina X, ar fi super să ne întâlnim pentru TEST DRIVE în data de zz.mm.yyyy ora hh:mm. Mersi mult, numai bine` } >
            <Button sx={{color:"#fcfcfc", direction:"row",backgroundColor:"#6a1e21", paddingX:2,boxShadow: 1, ":hover": {color:"#6a1e21", backgroundColor:"#fcfcfc"}}}>
                <EmailOutlined sx={{ marginRight:'4px', }} />
                Trimte un mesaj
            </Button>
            </a>
        </Box>
    );
};

export default AgentMessage;

