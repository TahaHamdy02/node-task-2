const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

module.exports.registerUserCtrl = async (req, res) => {
  try {
    // validate user input
    const { error } = validateRegisterUser(req.body);

    // check for validation errors
    if (error) {
      // check if the error was due to a pattern validation failure
      if (error.details[0].type === "string.pattern.base") {
        throw new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long"
        );
      } else {
        // validation error message
        throw new Error(error.details[0].message);
      }
    }

    // check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // create a new user object with the validated and hashed user input
    const newUser = new User(req.body);

    // save the new user
    await newUser.save();

    // send success response
    res.status(201).json({
      message: "You have successfully registered, please log in.",
      newUser,
    });
  } catch (err) {
    // send error response
    res.status(400).json({ message: err.message });
  }
};

module.exports.loginUserCtrl = async (req, res) => {
  try {
    // Validate user input
    const { error } = validateLoginUser(req.body);

    // If validation fails
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password input to the hashed password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If password doesn't match
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = user.generateAuthToken();
    user.tokens = user.tokens.concat(token);
    // Return the user object and token in the response
    res.status(200).json(user);
  } catch (error) {
    // If an error occurs
    res.status(400).json({ message: error.message });
  }
};

module.exports.logoutUserCtrl = async (req, res) => {
  try {
    // Find the user by id
    const user = await User.findById(req.user.id);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the token exists in the tokens array
    const tokenIndex = user.tokens.findIndex((token) => token === req.token);
    if (tokenIndex === -1) {
      throw new Error("Invalid token");
    }

    // Remove the token from the tokens array
    user.tokens.splice(tokenIndex, 1);

    // Save the updated user
    await user.save();

    // Return success response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // If an error occurs
    res.status(400).json({ message: error.message });
  }
};
