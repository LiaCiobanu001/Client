import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowCircleUpRounded from "@mui/icons-material/ArrowCircleUpRounded";
import { useList } from "@refinedev/core";


import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

const TotalRevenue = () => {

    //citire de date din baza de date 
    const { data} = useList({resource: "cars"});

    const infoCar = data?.data ?? [];

    //aflarea sumei totale
    const sumPrice = infoCar.reduce((acc, car) => acc + car.price, 0);

    return (
        <Box
            p={4}
            flex={1}
            bgcolor="#fcfcfc"
            id="chart"
            display="flex"
            flexDirection="column"
            borderRadius="15px"
        >
            <Typography fontSize={18} fontWeight={600} color="#11142d">
                Total venit
            </Typography>

            <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
                <Typography fontSize={28} fontWeight={700} color="#11142d">
                    {sumPrice}$
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                    <ArrowCircleUpRounded
                        sx={{ fontSize: 25, color: "#6a1e21" }}
                    />
                    <Stack>
                        <Typography fontSize={15} color="#6a1e21">
                            0.8%
                        </Typography>
                        <Typography fontSize={12} color="#808191">
                            De cât luna trecută
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <ReactApexChart
                series={TotalRevenueSeries}
                type="bar"
                height={310}
                options={TotalRevenueOptions} 
            />
        </Box>
    );
};

export default TotalRevenue;
