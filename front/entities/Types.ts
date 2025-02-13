import { Control, UseFormHandleSubmit } from "react-hook-form";
export interface Game {
  id: Number
  name: String
  description: String
  createdAt: Date
  updatedAt: Date
}
export interface Contract {
  id: Number
  name: String
  description: String
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionType {
  id:               Number
  name:             String
  nbPromoCodes:     Number
  accessToDasboard: Boolean
  statistics:       Boolean
  prioritySupport:  Boolean
  price:            GLfloat
}

export interface GameParticipation {
  id: Number
  game: Game
  user: User
  createdAt: Date
  updatedAt: Date
}
export interface ApiResult {
  id: Number
  siret: String
  adresse: String
  denomination: String
  latitude: Number
  longitude: Number
  category: String
  picture: String | null
  createdAt: Date
  updatedAt: Date
}
export interface UserApiResult {
  id: Number
  user: User
  apiResult: ApiResult
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id:             Number,
  email:          String  
  password :      String
  createdAt:      Date
  firstName :      String
  lastName  :     String
  phoneNumber  :  String | null
  userType   :    String
  contracts  :    Contract[]
  participations: GameParticipation[]
  userApiResults: UserApiResult[]
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
