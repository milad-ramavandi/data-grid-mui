import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { IPost } from "../../types";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { useDeleteUser, useGetUsers } from "../../hooks/queries/users";
import CircularProgress from "@mui/material/CircularProgress";
import useModal from "../../hooks/useModal";
import Modal from "@mui/material/Modal";
import PostForm from "../post-form";
import Button from "@mui/material/Button";
import { faLocaleText } from "../../utils";



const DataGridComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<IPost | null>(null);
  const { isOpenModal, handleCloseModal, handleOpenModal } = useModal();
  const { data, isLoading } = useGetUsers(page, pageSize);
  const rows = data?.map((user: IPost, index: number) => {
    return {
      id: index,
      row: user.id,
      title: user.title,
      body: user.body,
    };
  });

  const deleteMutation = useDeleteUser();

  const handleDelete = async (id: number) => {
    setDeleteItemId(id);
    await deleteMutation.mutateAsync(id);
    setDeleteItemId(null);
  };

  const handleEditClick = (user: IPost) => {
    handleOpenModal();
    setSelectedUser(user);
    setMode("edit");
  };

  const handleCreateClick = () => {
    handleOpenModal();
    setSelectedUser(null);
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
    <Stack direction={"column"} spacing={2}>
      <Button onClick={handleCreateClick} className="w-20">
        ایجاد پست
      </Button>
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
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        className="flex items-center justify-center"
      >
        <PostForm onClose={handleCloseModal} user={selectedUser} mode={mode} />
      </Modal>
    </Stack>
  );
};

export default DataGridComponent;
