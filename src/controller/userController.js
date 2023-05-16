const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");

module.exports.getAllUsersCtrl = async (req, res) => {
  try {
    // Get all users and exclude the password field
    const users = await User.find().select("-password");
    // Return the list of users to the client
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getUserCtrl = async (req, res) => {
  try {
    // Get user by id and exclude the password field
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("posts");
    // Check if user is found
    if (!user) {
      return res.status(404).json({ message: "user not fond" });
    }
    //Return user if found
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateUserCtrl = async (req, res) => {
  try {
    // Validate request body
    const { error } = validateUpdateUser(req.body);
    // check for validation errors
    if (error) {
      // check if the error was due to a pattern validation failure
      if (error.details[0].type === "string.pattern.base") {
        // throw custom error message if pattern validation fails
        throw new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long"
        );
      } else {
        // throw the validation error message if it was not a pattern validation failure
        throw new Error(error.details[0].message);
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ message: "User updated", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.getAllUsersCountCtrl = async (req, res) => {
  const count = await User.count();
  res.status(200).json(count);
};
module.exports.deleteUserCtrl = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted" });
};
