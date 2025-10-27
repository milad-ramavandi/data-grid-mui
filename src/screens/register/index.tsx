import Box from "@mui/material/Box";
import RegisterForm from "../../components/forms/register-form";

const RegisterScreen = () => {
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <RegisterForm />
    </Box>
  );
};

export default RegisterScreen;
