import jwt from "jsonwebtoken";

export const signJwt = (data: any) => {
  const token = jwt.sign(data, "secret-key-is-here");
  return token;
};

export const verifyJwt = (token: string) => {
  const isVerified = jwt.verify(token, "secret-key-is-here");
  return isVerified;
};