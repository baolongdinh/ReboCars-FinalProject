const userModel = require("../models/user.model");
const { respondOK, respondFailure } = require("../helpers/respond.helper");
const {
  uploadUserFormData,
} = require("../middlewares/multer/userAvatarUpload");

const multer = require("multer");
const bcrypt = require("bcrypt");
const {
  deleteFileWithPath,
  bcryptCompareValue,
} = require("../helpers/helperFunc");
var {
  BadRequestError,
  UnAuthorizedError,
  ForbiddenError,
  NotfoundError,
} = require("../core/error.response");

// email: {
//   type: String,
//   required: true,
// },
// name: {
//   type: String,
//   require: true,
// },
// password : {
//     type: String,
//       required: true,
//     },
// avatar: {
//   type: String,
// },
// phone: {
//   type: String,
// },
// driving_license: {
//  type: Schema.Types.Mixed,
// },
// role: {
//   type: String,
// },

const userSelectField = {
  password: 0,
};

const userService = {
  getAllUsers: async ({
    limit = 10,
    sort = "ctime",
    page = 1,
    filter,
    select = userSelectField,
  }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const users = await userModel
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(select)
      .lean();

    if (!users) {
      throw new NotfoundError("Invalid value");
    }
    return users;
  },

  addUser: async (req, res) => {
    uploadUserFormData(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return respondFailure(res, "Multer error occurred when uploading", 401);
        // A Multer error occurred when uploading.
      } else if (err) {
        return respondFailure(res, "Internal error", 500);
      }
      // Everything went fine.

      if (!req.file) {
        return respondFailure(res, "can not found file upload", 500);
      }

      const { email, password, name, phone, driving_license, role } = req.body;

      if (!password || !email || !name) {
        return respondFailure(res, "invalid value", 403);
      }

      //Check email exist
      const emailExist = await userModel.findOne({ email });
      if (emailExist) {
        return respondFailure(res, "Email exist", 403);
      }
      const salt = await bcrypt.genSaltSync(10);
      const passwordHash = await bcrypt.hashSync(password, salt);

      const avatar_path = `/static/images/users/${req.file.filename}`;
      console.log(avatar_path);
      const newUser = await userModel.create({
        email,
        password: passwordHash,
        name,
        avatar: avatar_path,
        phone,
        driving_license,
        role,
      });

      if (!newUser) {
        return respondFailure(res, "Mongoose create user got Error", 403);
      }
      delete newUser._doc.password;
      return respondOK(res, { newUser }, "user added successfully", 201);
    });
  },

  deleteUserById: async (id) => {
    const existedUser = await userModel.findById(id).lean();
    if (!existedUser) {
      throw new NotfoundError("Can not found user ID");
    }

    userModel
      .findByIdAndDelete(id)
      .then(() => {
        //delete user avt-image
        if (existedUser.avatar) {
          const userAvtImagePath = existedUser.avatar.replace(
            "static",
            "public"
          );

          deleteFileWithPath(userAvtImagePath);
        }
      })
      .catch((err) => {
        throw new BadRequestError("Delete user with Id got error");
      });
  },

  updateUserById: async (
    id,
    { name, phone, driving_license, role, active }
  ) => {
    console.log(name);
    const updatedUser = await userModel
      .findByIdAndUpdate(
        id,
        {
          name,
          phone,
          driving_license,
          role,
          active,
        },
        {
          new: true,
        }
      )
      .catch((err) => {
        throw new NotfoundError(err.message);
      });

    delete updatedUser._doc.password;
    return updatedUser;
  },

  resetPwdByUserById: async (id, { oldPassword, newPassword }) => {
    const userExist = await userModel.findById(id);

    if (oldPassword === newPassword) {
      throw new BadRequestError("Old password and new password are the same");
    }

    if (!userExist) {
      throw new NotfoundError("Can not found user ID");
    }

    if (!(await bcryptCompareValue(oldPassword, userExist.password))) {
      throw new BadRequestError("Password did not match");
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(newPassword, salt);

    userExist.password = passwordHash;

    await userExist.save();
  },

  updateUserAvtImageByID: async (req, res, id) => {
    uploadUserFormData(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return respondFailure(res, "Multer error occurred when uploading", 401);
        // A Multer error occurred when uploading.
      } else if (err) {
        return respondFailure(res, "Internal error", 500);
      }

      // Everything went fine.
      const userExist = await userModel.findById(id);

      if (!userExist) {
        throw new NotfoundError("Can not found user ID");
      }

      //delete user avt-image
      if (userExist.avatar) {
        const userAvtImagePath = userExist.avatar.replace("static", "public");
        deleteFileWithPath(userAvtImagePath);
      }
      const new_avatar_path = `/static/images/users/${req.file.filename}`;

      userExist.avatar = new_avatar_path;
      userExist
        .save()
        .then(() => {
          return respondOK(
            res,
            { new_avatar_path },
            "update avatar successfully",
            202
          );
        })
        .catch((err) => {
          return respondFailure(res, err.message, 500);
        });
    });
  },
};

module.exports = userService;
