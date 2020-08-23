module.exports = {
  validateSignupInput: (username, email, password, confirmPassword) => {
    console.log(username, email, password, confirmPassword);
    const errors = {};
    if (username.trim() === "") {
      errors.username = "Must not be empty";
    }

    if (password.trim() === "") {
      errors.password = "Must not be empty";
    }

    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Must not be empty";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (email.trim() === "") {
      errors.email = "Must not be empty";
    } else {
      const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = "Not a valid email";
      }
    }

    return {
      errors,
      isValid: Object.keys(errors).length < 1 ? true : false,
    };
  },
  validateSigninInput: (email, password) => {
    const errors = {};
    if (email.trim() === "") {
      errors.email = "Email must not be empty";
    } else {
      const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = "Not a valid email";
      }
    }

    if (password.trim() === "") {
      errors.password = "Password must not be empty";
    }

    return {
      errors,
      isValid: Object.keys(errors).length < 1 ? true : false,
    };
  },
};
