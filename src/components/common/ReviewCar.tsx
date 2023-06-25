import * as React from 'react';

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Star from "@mui/icons-material/Star";
import { Rating } from "@mui/lab";

import { CarCardProps } from 'interfaces/car'

const ReviewCar = ({
    id,
    title,
    price,
    photo,
}: CarCardProps) => {

    const [value, setValue] = React.useState<number | null>(0);

    const handleChange = (
        _event: React.ChangeEvent<{}>,
        newValue: number | null
    ) => {
        setValue(newValue);
        saveValueToLocalStorage(newValue);
    }

    //salvarea informatiilor pe un storage local
    const saveValueToLocalStorage = (value: number | null): void => {
        localStorage.setItem('value', value?.toString() ?? '');
        console.log('Value saved to local storage successfully.');
      };


    return (
        <Card
            sx={{
                maxWidth: "330px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
            }}
            elevation={0}
        >
            <CardMedia
                component="img"
                width="100%"
                height={210}
                image={photo}
                alt="card image"
                sx={{ borderRadius: "10px" }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {title}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={handleChange}
                            onClick={() => saveValueToLocalStorage(value)}
                            precision={0.5}
                        />
                    </Stack>
                </Stack>
                <Box
                    px={1.5}
                    py={0.5}
                    borderRadius={1}
                    bgcolor="#dadefa"
                    height="fit-content"
                >
                    <Typography fontSize={12} fontWeight={600} color="#475be8">
                        ${price}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ReviewCar