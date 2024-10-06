// All required import
import Jwt from "jsonwebtoken";

// CreateSignToken
export const CreateSignToken = (payload: any, role: string) =>
  Jwt.sign({ _id: payload, role }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_Expire,
  });

// CreateResetToken
export const CreateResetToken = (payload: any) =>
  Jwt.sign({ _id: payload }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_Expire,
  });
