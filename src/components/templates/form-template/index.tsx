import { useEffect } from "react";
import { useCreateUser, useEditUser } from "../../../hooks/queries/users";
import type { IPost } from "../../../types";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onClose: () => void;
  mode: "create" | "edit";
  post?: IPost | null;
}

const initialValues: IPost = {
  title: "",
  body: "",
};

const schema = Yup.object().shape({
  title: Yup.string().required("Required"),
  body: Yup.string().required("Required"),
});

const FormTemplate = ({ onClose, mode, post }: Props) => {
  const onSubmit = async (values: IPost) => {
    if (mode === "create") {
      const data = await createMutation.mutateAsync({ ...values });
      console.log(data);
    } else if (mode === "edit" && post) {
      await editMutation.mutateAsync({ id: post.id, ...values });
    }
    onClose();
  };

  const { touched, errors, getFieldProps, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });

  const createMutation = useCreateUser();
  const editMutation = useEditUser();

  useEffect(() => {
    if (mode === "edit" && post) {
      setFieldValue("title", post.title);
      setFieldValue("body", post.body);
    }
  }, [mode, post]);

  return (
    <div className="space-y-3 bg-gray-300 w-[600px] p-2 rounded-lg">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="عنوان"
          margin="normal"
          {...getFieldProps("title")}
          error={(touched.title && errors.title) ? true : false}
          helperText={touched.title && errors.title}
        />
        <TextField
          fullWidth
          label="توضیحات"
          margin="normal"
          {...getFieldProps("body")}
          error={(touched.body && errors.body) ? true : false}
          helperText={touched.body && errors.body}
        />
        <Stack direction={"row"} spacing={2}>
          <Button onClick={onClose}>لغو</Button>
          <Button
            variant="contained"
            type="submit"
            loading={
              (createMutation.isPending || editMutation.isPending) && true
            }
          >
            {mode === "create" ? "ایجاد" : "ویرایش"}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default FormTemplate;
