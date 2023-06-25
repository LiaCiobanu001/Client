import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate, Link } from "react-router-dom";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Star from "@mui/icons-material/Star";

import { CustomButton } from "components";

// control imagine 
function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const CarDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const carDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Ceva a mers greșit !</div>;
    }

    const isCurrentUser = user.email === carDetails.creator.email;

    const handleDeleteCar = () => {
        const response = confirm(
            "Ești sigur că dorești să ștergi această mașină ?",
        );
        if (response) {
            mutate(
                {
                    resource: "cars",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/cars");
                    },
                },
            );
        }
    };


    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Detalii mașină
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={carDetails.photo}
                        alt="car_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="car_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {/*{carDetails.carType}*/}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {carDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#808191" }} />
                                    <Typography fontSize={14} color="#808191">
                                        {carDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    Prețul
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#6a1e21"
                                    >
                                        ${carDetails.price}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        mb={0.5}
                                    >
                                        {/*for one day*/}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Descriere
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {carDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(carDetails.creator.avatar)
                                        ? carDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {carDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Dealer
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Carolina de Nord, USA
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {carDetails.creator.allCars.length}{" "}
                                Mașini
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Mesaj" : "Editare"}
                                backgroundColor="#6a1e21"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/cars/edit/${carDetails._id}`,
                                        );
                                    } else {
                                        //    `${carDetails.creator.email}`
                                        
                                            const emailSubject = encodeURIComponent('Interesat de mașină');
                                            const emailBody = encodeURIComponent(
                                                `Bună ziua vă scriu referitor la mașina X, ar fi super să ne întâlnim pentru TEST DRIVE în data de zz.mm.yyyy ora hh:mm. Mersi mult, numai bine`
                                            );
                                            const mailtoLink = `mailto:${carDetails.creator.email}?subject=${emailSubject}&body=${emailBody}`;
                                    
                                            window.location.href = mailtoLink;
                                    }
                                    
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Sună" : "Șterge"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        handleDeleteCar();
                                    } else {
                                        const messageLink = "https://web.whatsapp.com/send?phone=+40749660983&text=Bună ziua vă scriu referitor la mașina X, ar fi super să ne întâlnim pentru TEST DRIVE în data de zz.mm.yyyy ora hh:mm. Mersi mult, numai bine&app_absent=0";
                                
                                        window.open(messageLink, "_blank");
                                        
                                    }
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Stack>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55565170.29301636!2d-132.08532758867793!3d31.786060306224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sStatele%20Unite%20ale%20Americii!5e0!3m2!1sro!2sro!4v1686922949436!5m2!1sro!2sro"
                            width="100%"
                            height="306"
                            frameBorder="0"
                            style={{ border: 0, borderRadius: 10, objectFit: "cover" }}
                            allowFullScreen
                            aria-hidden="false"
                            tabIndex={0}
                        />



                    </Stack>

                    {/*<Box>
                        <CustomButton
                            title="Book Now"
                            backgroundColor="#6a1e21"
                            color="#FCFCFC"
                            fullWidth
                        />
                    </Box>*/}
                </Box>
            </Box>
        </Box>
    );
};

export default CarDetails;
