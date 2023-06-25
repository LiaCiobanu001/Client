import Add from "@mui/icons-material/Add";
import { useTable } from "@refinedev/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { CarCard, CustomButton } from "components";

const AllCars = () => {
    const navigate = useNavigate(); 

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable();

    const allCars = data?.data ?? [];


    const currentPrice = sorter.find((item) => item.field === "price")?.order;

    //sortarea pretului descendet/ascendet
    const toggleSort = (field: string) => {
        setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
    };

    //cautare dupa titlu si tipul masini
    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value ||
                "",
            carType:
                logicalFilters.find((item) => item.field === "carType")
                    ?.value || "",
        };
    }, [filters]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;

    return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700} color="#11142d">
                        {!allCars.length
                            ? "Nu este postată nici o mașină"
                            : "Toate mașinile"}
                    </Typography>
                    <Box
                        mb={2}
                        mt={3}
                        display="flex"
                        width="84%"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            mb={{ xs: "20px", sm: 0 }}
                        >
                            <CustomButton
                                title={`Sortează preț ${
                                    currentPrice === "asc" ? "↑" : "↓"
                                }`}
                                handleClick={() => toggleSort("price")}
                                backgroundColor="#6a1e21"
                                color="#fcfcfc"
                            />
                            <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Caută după titlu"
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value
                                                ? e.currentTarget.value
                                                : undefined,
                                        },
                                    ]);
                                }}
                            />
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues.carType}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "carType",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">Toate</MenuItem>
                                {[
                                    "Cabriolet",
                                    "EstateCar",
                                    "SUV",
                                    "Saloon",
                                    "SmallCar",
                                    "SportCar",
                                    "Minibus",
                                    "Coupe",
                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type.toLowerCase()}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <CustomButton
                    title="Adaugă mașină"
                    handleClick={() => navigate("/cars/create")}
                    backgroundColor="#6a1e21"
                    color="#fcfcfc"
                    icon={<Add />}
                />
            </Stack>

            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {allCars?.map((car) => (
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

            {allCars.length > 0 && (
                <Box display="flex" gap={2} mt={3} flexWrap="wrap" >
                    <CustomButton
                        title="Pagina precedentă"
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor="#6a1e21"
                        color="#fcfcfc"
                        disabled={!(current > 1)}
                    />
                    <Box
                        display={{ xs: "hidden", sm: "flex" }}
                        alignItems="center"
                        gap="5px"
                    >
                        Pagina{" "}
                        <strong>
                            {current} of {pageCount}
                        </strong>
                    </Box>
                    <CustomButton
                        title="Pagina următoare"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor="#6a1e21"
                        color="#fcfcfc"
                        disabled={current === pageCount}
                        
                    />
                    <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={5}    
                        onChange={(e) =>
                            setPageSize(
                                e.target.value ? Number(e.target.value) : 5,
                            )
                        }
                    >
                        {[5, 10, 15, 20].map((size) => (
                            <MenuItem key={size} value={size}>
                                Arată {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
        </Box>
    );
};

export default AllCars;
