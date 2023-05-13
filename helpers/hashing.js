const bcrypt = require("bcryptjs");
const saltRounds = 10; // It is used to define the level of difficulty

const hashGenerate = async (plainPassword) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};

const hashValidator = async (plainPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
  } catch (error) {
    console.error("Error occurred while validating hash:", error);
    return false;
  }
};

module.exports = {
  hashGenerate,
  hashValidator,
};