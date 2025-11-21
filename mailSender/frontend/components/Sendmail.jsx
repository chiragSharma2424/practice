import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Sendmail = () => {
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Box
      sx={{ maxWidth: 500,margin: "40px auto",padding: 2}}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Send Email
        </Typography>

        <TextField fullWidth label="Recipient Email" variant="outlined" sx={{ mb: 2 }}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <TextField fullWidth label="Message"variant="outlined" multiline rows={4}sx={{ mb: 3 }}
           onChange={(e) => {
            setMessage(e.target.value);
           }}
        />

        <Button variant="contained" fullWidth endIcon={<SendIcon />}
           onClick={() => {
            fetch('http://localhost:5000/send-mail', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  mail: mail,
                  message: message
                })
            }).then((resp) => {
                return resp.json()
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(`error in sending request ${err}`);
             })
           }}>
          Send Mail
        </Button>
      </Paper>
    </Box>
  );
};

export default Sendmail;