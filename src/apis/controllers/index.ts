import api from "..";
import type { IPost } from "../../types";
import endpoints from "../configs/endpoints";

export const getPosts = async (page: number, pageSize: number) => {
  const users = await api(
    `${endpoints.posts}?_start=${page}&_limit=${pageSize}`
  );
  return users;
};

export const deletePost = async (id: number) => {
  await api(`${endpoints.posts}${id}`, {
    method: "DELETE",
  });
};

export const createPost = async (data: IPost) => {
  await api(`${endpoints.posts}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editPost = async (data: IPost) => {
  await api(`${endpoints.posts}${data.id}`, {
    method: "PUT",
    body: JSON.stringify({title: data.title, body: data.body}),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
