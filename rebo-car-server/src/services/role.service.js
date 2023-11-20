const roleModel = require('../models/role.model');
var {
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError,
    InternalServerError
} = require('../core/error.response');
// name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },

const roleServices = {
    getAllRoles: async () => {
        try {
            const roles = await roleModel.find().lean();
            return roles;
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    },
    addRole: async ({ name, description, permissions }) => {
        try {
            const role = await roleModel.create({ name, description, permissions });
            return role;
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    },
    updateRoleById: async (id, { name, description, permissions }) => {
        try {
            const role = await roleModel.findByIdAndUpdate(
                id,
                { name, description, permissions },
                { new: true }
            );
            return role;
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    },
    deleteRoleById: async (id) => {
        try {
            await roleModel.findByIdAndDelete(id);
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    },
    updatePermissionRoleById: async (id, { permissions }) => {
        try {
            const role = await roleModel.findByIdAndUpdate(id, { permissions }, { new: true });
            return role;
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    },
    findDiscountsFilterWithRegexString: async ({
        limit = 6,
        page = 1,
        matchString = '',
        sort = {
            createdAt: -1
        }
    }) => {
        try {
            const skip = (page - 1) * parseInt(limit);
            const roles = await roleModel.aggregate([
                {
                    $match: {
                        $or: [
                            { name: { $regex: matchString, $options: 'i' } },
                            { description: { $regex: matchString, $options: 'i' } }
                        ]
                    }
                },
                { $sort: sort },
                { $skip: skip },
                { $limit: parseInt(limit) }
            ]);

            if (!roles) {
                throw new NotfoundError('Invalid value');
            }

            const totalRoles = await roleModel.countDocuments();

            const data = {
                totalRoles,
                roles
            };
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }
};

module.exports = roleServices;
