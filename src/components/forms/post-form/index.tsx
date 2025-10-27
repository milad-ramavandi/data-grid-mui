import TextField from "@mui/material/TextField";
import { useCreatePost, useEditPost } from "../../../hooks/queries/posts";
import type { IPost, IPostFormInitialValues } from "../../../types";
import FormTemplate from "../../templates/form-template";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("پر کردن عنوان الزامی است."),
  body: Yup.string().required("پر کردن توضیحات الزامی است"),
});

const PostForm = ({
  mode,
  onClose,
  post,
}: {
  mode: "create" | "edit";
  onClose: () => void;
  post: IPost;
}) => {
  const initialValues: IPostFormInitialValues = {
    title: mode === "edit" ? post.title : "",
    body: mode === "edit" ? post.body : "",
  };
  const onCreatePost = useCreatePost();
  const onEditPost = useEditPost();
  const onSubmit = async (values: IPost) => {
    if (mode === "create") {
      const newPost = await onCreatePost.mutateAsync(values);
      console.log(newPost);
    } else {
      await onEditPost.mutateAsync({ id: post.id, ...values });
    }
    onClose();
  };

  return (
    <FormTemplate<IPostFormInitialValues>
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
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          className={"bg-gray-300 p-2 w-[600px]"}
        >
          <form onSubmit={handleSubmit} className="!space-y-2">
            <TextField
              label="عنوان"
              fullWidth
              {...getFieldProps("title")}
              error={touched.title && errors.title ? true : false}
              helperText={errors.title}
            />

            <TextField
              label="توضیحات"
              fullWidth
              {...getFieldProps("body")}
              error={touched.body && errors.body ? true : false}
              helperText={errors.body}
            />

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"start"}
              gap={2}
            >
              <Button onClick={onClose} variant={'outlined'}>
                لغو
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                variant={"contained"}
              >
                {mode === "create" ? "ایجاد" : "ویرایش"}
              </Button>
            </Box>
          </form>
        </Box>
      )}
    />
  );
};

export default PostForm;
