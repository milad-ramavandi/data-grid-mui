import type { Dayjs } from "dayjs";

export interface IPost {
  id?: string;
  title: string;
  body: string;
}

export interface IPostFormInitialValues {
  title: string;
  body: string;
}

export interface ILoginFormInitialValues {
  username:string;
  password:string;
}

export interface IRegisterFormInitialValues {
  firstName:string;
  lastName:string;
  email:string;
  gender:string;
  birthDate:Dayjs | null | undefined;
  image: File | null | undefined;
  resume:File | null | undefined
}
