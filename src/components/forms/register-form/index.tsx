import type { IRegisterFormInitialValues } from "../../../types";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import FormTemplate from "../../templates/form-template";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { faIR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/fa";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const genderOptions = [
  { value: "female", label: "زن" },
  { value: "male", label: "مرد" },
  { value: "other", label: "سایر" },
];

const validFileExtensions = {
  image: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  document: ["application/pdf", "application/zip"],
};

const initialValues: IRegisterFormInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  birthDate: null,
  resume: null,
  image: null,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("وارد کردن نام الزامی است"),
  lastName: Yup.string().required("وارد کردن نام خانوادگی الزامی است"),
  email: Yup.string()
    .email("ایمیل نا معتبر است")
    .required("وارد کردن ایمیل الزامی است"),
  gender: Yup.string()
    .oneOf(genderOptions.map((item) => item.value), "جنسیت نامعتبر است")
    .required("مشخص کردن جنسیت الزامی است"),
  birthDate: Yup.mixed<Dayjs>()
    .nullable()
    .test("validate date", "تاریخ تولد نامعتبر است", (value) => {
      if (!value) {
        return true;
      }
      return dayjs(value).isValid() && dayjs(value).isBefore(dayjs());
    })
    .required("وارد کردن تاریخ تولد الزامی است"),
  resume: Yup.mixed<File>()
    .nullable()
    .test(
      "validate size",
      "حجم فایل نباید بیشتر از ۲ مگابایت باشد",
      (value) => {
        if (!value) {
          return true;
        }
        return value.size <= 2 * 1024 * 1024;
      }
    )
    .test("validate type", "فرمت فایل باید pdf یا zip باشد", (value) => {
      if (!value) {
        return true;
      }
      return validFileExtensions.document.includes(value.type);
    })
    .required("رزومه خود را انتخاب کنید"),

  image: Yup.mixed<File>()
    .nullable()
    .test(
      "validate size",
      "حجم فایل نباید بیشتر از ۱ مگابایت باشد",
      (value) => {
        if (!value) {
          return true;
        }
        return value.size <= 1 * 1024 * 1024;
      }
    )
    .test(
      "validate type",
      "فرمت تصویر باید jpeg, jeg, png یا webp باشد",
      (value) => {
        if (!value) {
          return true;
        }
        return validFileExtensions.image.includes(value.type);
      }
    )
    .required("عکس پروفایل خود را انتخاب کنید"),
});

const onSubmit = async (values: IRegisterFormInitialValues) => {
  console.log(values);
};

const RegisterForm = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      className={"bg-gray-300 p-2"}
      width={"600px"}
    >
      <FormTemplate<IRegisterFormInitialValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        render={({
          values,
          getFieldProps,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
          errors,
          touched,
          isSubmitting,
        }) => {
          const handleFileChange = (
            event: React.ChangeEvent<HTMLInputElement>,
            fieldName: string
          ) => {
            const file = event.target.files?.[0];
            if (file) {
              setFieldValue(fieldName, file);
            }
            event.target.value = "";
          };
          return (
            <form onSubmit={handleSubmit} className="!space-y-2">
              <TextField
                label="نام"
                fullWidth
                {...getFieldProps("firstName")}
                error={touched.firstName && errors.firstName ? true : false}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                label="نام خانوادگی"
                fullWidth
                {...getFieldProps("lastName")}
                error={touched.lastName && errors.lastName ? true : false}
                helperText={touched.lastName && errors.lastName}
              />

              <TextField
                label="ایمیل"
                fullWidth
                {...getFieldProps("email")}
                error={touched.email && errors.email ? true : false}
                helperText={touched.email && errors.email}
              />

              <TextField
                label="جنسیت"
                fullWidth
                select
                {...getFieldProps("gender")}
                error={touched.gender && errors.gender ? true : false}
                helperText={touched.gender && errors.gender}
              >
                {genderOptions.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="fa"
              >
                <DatePicker
                  name="birthDate"
                  value={values.birthDate}
                  onChange={(value) => setFieldValue("birthDate", value)}
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      label: "تاریخ تولد",
                      onBlur: () => setFieldTouched("birthDate", true),
                      error:
                        touched.birthDate && errors.birthDate ? true : false,
                      helperText: touched.birthDate && errors.birthDate,
                    },
                  }}
                  localeText={
                    faIR.components.MuiLocalizationProvider.defaultProps
                      .localeText
                  }
                />
              </LocalizationProvider>

              <Box display={"flex"} flexDirection={"column"}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  onBlur={() => setFieldTouched("resume", true)}
                >
                  {values.resume ? values.resume.name : "انتخاب فایل رزومه"}
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e, "resume")}
                  />
                </Button>
                {touched.resume && errors.resume && (
                  <Typography color="error" variant={"subtitle2"}>
                    {errors.resume}
                  </Typography>
                )}
              </Box>

              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  padding={"0 10px"}
                  marginTop={2}
                >
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    onBlur={() => setFieldTouched("image", true)}
                    disabled={values.image ? true : false}
                  >
                    انتخاب عکس پروفایل
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e, "image")}
                    />
                  </Button>
                  <Box position={"relative"} width={120} height={120}>
                    {values.image && (
                      <Tooltip title={"Delete Image"} placement={"right"}>
                        <IconButton
                          className="absolute top-0 left-7 z-50"
                          onClick={() => setFieldValue("image", null)}
                        >
                          <DeleteIcon color={"error"} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Avatar
                      src={
                        values.image
                          ? URL.createObjectURL(values.image)
                          : undefined
                      }
                      sx={{ width: "100%", height: "100%" }}
                      className="!absolute inset-0"
                    />
                  </Box>
                </Box>
                {touched.image && errors.image && (
                  <Typography color="error" variant={"subtitle2"}>
                    {errors.image}
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                loading={isSubmitting}
                variant={"contained"}
              >
                ثبت نام
              </Button>
            </form>
          );
        }}
      />
    </Box>
  );
};

export default RegisterForm;
