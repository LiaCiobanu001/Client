import { useRef } from "react";
import emailjs from "emailjs-com";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { CustomButton } from "components";


const Report = () => {

  const form = useRef();

  //functia de trimitere mail 
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_3x7qvwh', 'template_vxo5tqg', form.current, 'jV52X1qLlaVvJOxyb')
      .then((result) => {
          console.log(result.text);
          e.target.reset();
          alert("Mesajul tău a fost trimis cu succes către admin!")
      }, (error) => {
          console.log(error.text);
          alert("Ceva a mers greșit, încearcă din nou mai târziu!")
      });
  };


  return (
    <Box>
      <Typography></Typography> <Typography fontSize={25} fontWeight={700} color="#11142d">
        Lasă o raportare
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form ref={form}
        onSubmit={sendEmail}
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}>
              Inregistrează numele tău
            </FormHelperText>
            <TextField
            name="name"
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              onKeyPress={(e) => {
                if (e.key === "+" || e.key === "-" || e.key === "&" || (/[0-9!"@#$%^*()_=\[\]\\\{\}|`~:;'\"<,>.\/?]/.test(e.key))) {
                  e.preventDefault();
                }
              }}
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
              Înregistrează emailul tău
            </FormHelperText>
            <TextField
              name="email"
              type="email"
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined" />
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
              Înregistrează problema ta
            </FormHelperText>
            <TextareaAutosize
            name="message"
              minRows={5}
              required
              placeholder="Scrie orice consideri necesar  ..."
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
            />
          </FormControl>
          <Box paddingTop={2}>
        <CustomButton
          type="submit"
          title={"Trimite"}
          backgroundColor="#6a1e21"
          color="#fcfcfc"
          />  
        </Box>
        </form>
        
      </Box>
    </Box>
  )
}

export default Report