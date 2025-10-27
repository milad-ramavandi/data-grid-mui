import { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { IPost } from "../../types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import useModal from "../../hooks/useModal";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { faLocaleText, formatNumber } from "../../utils";
import { useDeletePost, useGetPosts } from "../../hooks/queries/posts";
import PostForm from "../../components/forms/post-form";

const PostsScreen = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();
  const { data, isLoading } = useGetPosts(page, pageSize);
  const rows = data?.map((user: IPost, index: number) => {
    return {
      id: index,
      row: formatNumber(user.id as string),
      title: user.title,
      body: user.body,
    };
  });

  // const rows = useMemo(
  //   () =>
  //     data?.map((user: IPost, index: number) => {
  //       return {
  //         id: index,
  //         row: formatNumber(user.id as string),
  //         title: user.title,
  //         body: user.body,
  //       };
  //     }),
  //   [page, pageSize]
  // );

  const deleteMutation = useDeletePost();

  const handleDelete = async (id: number) => {
    setDeleteItemId(id);
    await deleteMutation.mutateAsync(id);
    setDeleteItemId(null);
  };

  const handleEditClick = (user: IPost) => {
    handleOpenModal();
    setSelectedPost(user);
    setMode("edit");
  };

  const handleCreateClick = () => {
    handleOpenModal();
    setSelectedPost(null);
    setMode("create");
  };

  const columns = [
    { field: "row", headerName: "ردیف", width: 200 },
    { field: "title", headerName: "عنوان", width: 200 },
    { field: "body", headerName: "توضیحات", width: 300 },
    {
      field: "actions",
      headerName: "عملیات",
      width: 300,
      renderCell: (params: any) => {
        const isDeleting = deleteItemId === params.row.id;
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              color="primary"
              onClick={() => handleEditClick(params.row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row.id)}
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />}
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={3}
    >
      <Box
        sx={{
          height: 400,
          width: { sm: "100%", md: "90%", lg: 1000 },
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box>
          <Button onClick={handleCreateClick} variant={"contained"}>
            ایجاد پست
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          rowCount={500}
          paginationMode="server"
          paginationModel={{ page: page - 1, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page + 1);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[5, 10, 20]}
          localeText={faLocaleText}
        />
      </Box>
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        className="flex items-center justify-center"
      >
        <PostForm
          onClose={handleCloseModal}
          post={selectedPost as IPost}
          mode={mode}
        />
      </Modal>
    </Stack>
  );
};

export default PostsScreen;
