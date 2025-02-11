import { Control, UseFormHandleSubmit } from "react-hook-form";

export interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  old: undefined;
  sport: string;
  level: string;
  city: string;
}
export interface Form {
  prevStep: number;
  nextStep: number;
  control: Control<User, any>;
}

export interface ValidForm {
  prevStep: number;
  handleSubmit: UseFormHandleSubmit<User>;
  handleSubmitForm: () => void;
  control: Control<User, any>;
}
