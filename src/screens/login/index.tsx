import Box from "@mui/material/Box";
import LoginForm from "../../components/forms/login-form";

const LoginScreen = () => {
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginScreen;
