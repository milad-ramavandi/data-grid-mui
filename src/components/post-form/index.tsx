import { useEffect, useState } from "react";
import { useCreateUser, useEditUser } from "../../hooks/queries/users";
import type { IPost } from "../../types";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface Props {
  onClose: () => void;
  mode: "create" | "edit";
  user?: IPost | null;
}

const PostForm = ({ onClose, mode, user }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const createMutation = useCreateUser();
  const editMutation = useEditUser();

  useEffect(() => {
    if (mode === "edit" && user) {
      setTitle(user.title);
      setBody(user.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [mode, user]);

  const handleSubmit = async () => {
    if (mode === "create") {
      await createMutation.mutateAsync({ title, body });
    } else if (mode === "edit" && user) {
      await editMutation.mutateAsync({ id: user.id, title, body });
    }
    onClose();
  };
  return (
    <div className="space-y-3 bg-gray-300 w-[600px] p-2 rounded-lg">
      <TextField
        fullWidth
        label="عنوان"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        label="توضیحات"
        margin="normal"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Stack direction={"row"} spacing={2}>
        <Button onClick={onClose}>لغو</Button>
        <Button onClick={handleSubmit} variant="contained" loading={(createMutation.isPending || editMutation.isPending) && true }>
          {mode === "create" ? "ایجاد" : "ادیت"}
        </Button>
      </Stack>
    </div>
  );
};

export default PostForm;
