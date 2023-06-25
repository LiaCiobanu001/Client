import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { PieChart, CarReferrals, TotalRevenue, CarCard } from "components";

const Home = () => {
  //citere date din masini
  const { data, isLoading, isError } = useList({
    resource: "cars",
  });

  //citere date din user
  const { Data } = useList({
    resource: "users",
  });

  const displayInfoCar = data?.data ?? [];

  const allUsers = Data?.data ?? [];

  //citire diferitor date din baza de date
  const maxPrice = Math.max(...displayInfoCar.map((car) => car.price));

  const minPrice = Math.min(...displayInfoCar.map((car) => car.price));

  const sumCar = displayInfoCar.reduce((acc, car) => acc + 1, 0);

  const sumUser = allUsers.reduce((acc, user) => acc + 1, 0);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Cel mai mare pret"
          value={`${maxPrice}$`}
          series={[75, 25]}
          colors={["#7b231b", "#cecece"]}
        />
        <PieChart
          title="Cel mai mic pret"
          value={`${minPrice}$`}
          series={[60, 40]}
          colors={["#7b231b", "#cecece"]}
        />
        <PieChart
          title="Total utilizatori"
          value={4}
          series={[75, 25]}
          colors={["#7b231b", "#cecece"]}
        />
        <PieChart
          title="Total mașini"
          value={sumCar}
          series={[75, 25]}
          colors={["#7b231b", "#cecece"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <CarReferrals />
      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Ultimile mașini
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {displayInfoCar.map((car) => (
            <CarCard
              key={car._id}
              id={car._id}
              title={car.title}
              location={car.location}
              price={car.price}
              photo={car.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
