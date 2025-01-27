export type TUserData = {
  _id: string;
  __v: number;
  name: string;
  userId: string;
  password: string;
  email: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  role: "admin" | "customer";
  status: "active" | "blocked";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
