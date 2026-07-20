import bcrypt from "bcrypt";

export const users = async () => [
  {
    name: "Administrator",
    email: "admin@dobumartialarts.com",
    password: await bcrypt.hash("Admin@123", 10),
    role: "ADMIN",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: await bcrypt.hash("Password123!", 10),
    role: "USER",
  },
];
