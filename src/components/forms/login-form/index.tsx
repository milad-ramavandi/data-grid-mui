import Box from "@mui/material/Box";
import type { ILoginFormInitialValues } from "../../../types";
import * as Yup from "yup";
import FormTemplate from "../../templates/form-template";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

const initialValues: ILoginFormInitialValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  username: Yup.string().required("وارد کردن نام کاربری الزامی است"),
  password: Yup.string().required("وارد کردن رمز عبور الزامی است"),
});

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setIsShowPassword((prev) => !prev);

  const onSubmit = async (values: ILoginFormInitialValues) => {
    console.log(values);
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      className={"bg-gray-300 p-2"}
    >
      <Typography variant={"h4"}>ورود</Typography>
      <FormTemplate<ILoginFormInitialValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        render={({
          touched,
          errors,
          getFieldProps,
          isSubmitting,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="!space-y-2">
            <TextField
              label="نام کاربری"
              fullWidth
              {...getFieldProps("username")}
              error={touched.username && errors.username ? true : false}
              helperText={errors.username}
            />
            <FormControl
              variant="outlined"
              fullWidth
              error={touched.username && errors.username ? true : false}
            >
              <InputLabel>
                رمز عبور
              </InputLabel>
              <OutlinedInput
                type={isShowPassword ? "text" : "password"}
                {...getFieldProps("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {isShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="رمز عبور"
              />
              <FormHelperText>{errors.username}</FormHelperText>
            </FormControl>

            <Button type="submit" loading={isSubmitting} variant={"contained"}>
              ارسال
            </Button>
          </form>
        )}
      />
    </Box>
  );
};

export default LoginForm;
