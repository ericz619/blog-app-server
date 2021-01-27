import { User } from '../models';

export default {
    Query: {
        me: (root, args, context, info) => {},
    },
    Mutation: {
        registerUser: async (root, args, context, info) => {
            try {
                const user = await User.create({ ...args });
                return {
                    ok: true,
                    user,
                    errors: [],
                };
            } catch (e) {
                if (e) {
                    console.log(e);
                }
            }
        },
        loginUser: (root, args, context, info) => {},
    },
};
