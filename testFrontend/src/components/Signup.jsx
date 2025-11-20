import axios from "axios";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box sx={{ 
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
        padding: 2,
      }}>
        
      <Paper elevation={6}
        sx={{ width: 380,
              padding: 4,
              borderRadius: 3
          }}>

        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600} textAlign="center" color="primary">
            Create an Account
          </Typography>

          <TextField label="Full Name" variant="outlined" fullWidth value={fullName}
            onChange={(e) => {
                setFullName(e.target.value);
            }}/>

          <TextField label="Email Address" variant="outlined"
            fullWidth type="email" value={email}
            onChange={(e) => {
                setEmail(e.target.value);
            }} />
          <TextField label="Password" variant="outlined"
            fullWidth type="password" value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }}/>

          <Button variant="contained" size="large" fullWidth sx={{ paddingY: 1 }}
            onClick={() => {
              axios.post("http://localhost:3000/api/auth/user/register", {
                  fullName,
                  email,
                  password,
                }).then((resp) => {
                    console.log(resp.data);
                })
            }}>
            Register
          </Button>

          <Typography variant="body2" textAlign="center" color="gray">
            Already have an account? Login instead
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Signup;