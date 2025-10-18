import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPost, deletePost, editPost, getPosts } from "../../../apis/controllers";
import type { IPost } from "../../../types";

export const useGetUsers = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["get-users", page, pageSize],
    queryFn: () => getPosts(page, pageSize),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      toast.success("کاربر با موفقیت حذف شد 👌");
    },
    onError: () => {
      toast.error("خطا در حذف کاربر ❌");
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: (post:IPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      toast.success("کاربر با موفقیت ایجاد شد 👌");
    },
    onError: () => {
      toast.error("خطا در ایجاد کاربر ❌");
    },
  });
};


export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-user"],
    mutationFn: (post:IPost) => editPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      toast.success("کاربر با موفقیت ویرایش شد 👌");
    },
    onError: () => {
      toast.error("خطا در ویرایش کاربر ❌");
    },
  });
};

