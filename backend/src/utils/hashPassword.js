import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export default { hashPassword };
