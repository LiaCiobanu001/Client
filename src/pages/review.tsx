import { useTable } from "@refinedev/core";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import ReviewCar from "components/common/ReviewCar";
import { CustomButton } from "components";

const Review = () => {

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
} = useTable({resource:"cars"});
  const allCars = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
               Lasă o recenzie
            </Typography>
     <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {allCars?.map((car) => (
                    <ReviewCar
                        key={car._id}
                        id={car._id}
                        title={car.title}
                        location={car.location}
                        price={car.price}
                        photo={car.photo}
                    />
                ))}
            </Box>

            {/* afisarea tuturor masinilor */}
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


  )
}

export default Review