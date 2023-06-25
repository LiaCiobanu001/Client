
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
    type,
    register,
    handleSubmit,
    handleImageChange,
    formLoading,
    onFinishHandler,
    carImage,
}: FormProps) => {

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {type} de mașină
            </Typography>

            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Introdu numele mașinii
                        </FormHelperText>
                        <TextField 
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            // limitarea casutelor
                            onKeyPress={(e) => {
                                if (e.key === "+" || e.key === "-" || e.key === "&" ||(/[!"@#$%^*()_=\[\]\\\{\}|`~:;'\"<,>.\/?]/.test(e.key))) {
                                    e.preventDefault();
                                  }
                              }}
                            {...register("title", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Introdu descrierea mașinii
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={5}
                            required
                            placeholder="Scrie descrierea mașinii"
                            color="info"
                            style={{
                                width: "100%",
                                background: "transparent",
                                fontSize: "16px",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: 10,
                                color: "#919191",
                            }}
                            {...register("description", { required: true })}
                        />
                    </FormControl>

                    <Stack direction="row" gap={4}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Selectează tipul de mașină
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue="cabriolet"
                                {...register("carType", {
                                    required: true,
                                })}
                            >
                                <MenuItem value="cabriolet">Cabriolet</MenuItem>
                                <MenuItem value="estatecar">Mașină Break</MenuItem>
                                <MenuItem value="suv">SUV</MenuItem>
                                <MenuItem value="saloon">Mașină Sedan</MenuItem>
                                <MenuItem value="smallcar">Mașină mică</MenuItem>
                                <MenuItem value="sportcar">Mașină sport</MenuItem>
                                <MenuItem value="minibus">Minibus</MenuItem>
                                <MenuItem value="coupe">Coupe</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Introdu prețul mașinii
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="outlined-basic"
                                color="info"
                                type="text"
                                variant="outlined"  
                            // limitarea casutelor
                                onKeyPress={(e) => {
                                    if (e.key === "+" || e.key === "-" || e.key === "&" ||(/[a-zA-Z!"@#$%^*()_=\[\]\\\{\}|`~:;'\"<,>.\/?]/.test(e.key))) {
                                        e.preventDefault();
                                      }
                                  }}
                                {...register("price", { required: true })}
                            />
                        </FormControl>
                    </Stack>

                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Introdu locația
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            // limitarea casutelor
                            onKeyPress={(e) => {
                                if (e.key === "+" || e.key === "-" || e.key === "&" ||(/[!"@#$%^*()_=\[\]\\\{\}|`~:;'\"<,>.\/?]/.test(e.key))) {
                                    e.preventDefault();
                                  }
                              }}
                            {...register("location", { required: true })}
                        />
                    </FormControl>

                    <Stack
                        direction="column"
                        gap={1}
                        justifyContent="center"
                        mb={2}
                    >
                        <Stack direction="row" gap={2}>
                            <Typography
                                color="#11142d"
                                fontSize={16}
                                fontWeight={500}
                                my="10px"
                            >
                                Poza mașinii
                            </Typography>

                            <Button
                                component="label"
                                sx={{
                                    width: "fit-content",
                                    color: "#2ed480",
                                    textTransform: "capitalize",
                                    fontSize: 16,
                                }}
                            >
                                Încărcat imaginea *
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        handleImageChange(e.target.files![0]);
                                    }}
                                />
                            </Button>
                        </Stack>
                        <Typography
                            fontSize={14}
                            color="#808191"
                            sx={{ wordBreak: "break-all" }}
                        >
                            {carImage?.name}
                        </Typography>
                    </Stack>

                    <CustomButton
                        type="submit"
                        title={formLoading ? "Se încarcă..." : "Postează"}
                        backgroundColor="#6a1e21"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default Form;
