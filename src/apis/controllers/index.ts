import api from "..";
import type { IPost } from "../../types";
import endpoints from "../configs/endpoints";

export const getPosts = async (page: number, pageSize: number) => {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.append("_start", `${page}`)
  }
  if (pageSize) {
    searchParams.append("_limit", `${pageSize}`);
  }

  const users = await api(
    `${endpoints.posts}${searchParams && `?${searchParams}`}`
  );
  return users;
};

export const deletePost = async (id: number) => {
  await api(`${endpoints.posts}${id}`, {
    method: "DELETE",
  });
};

export const createPost = async (data: IPost) => {
  const res = await api(`${endpoints.posts}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res
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
