import bcrypt from "bcrypt";

export const users = async () => [
  {
    name: "Administrator",
    email: "hopetech040726@gmail.com",
    password: await bcrypt.hash("Admin@123", 10),
    role: "ADMIN",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: await bcrypt.hash("Password123!", 10),
    role: "USER",
  },
  {
    name: "Cena",
    email: "cena@example.com",
    password: await bcrypt.hash("1", 10),
    role: "ADMIN",
  },
];
