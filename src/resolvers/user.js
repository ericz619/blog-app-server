import { User } from '../models';

import { attemptLogin } from '../helper/auth';

export default {
    Query: {
        me: (root, args, context, info) => {
            console.log(context.me);
            return User.findById(context.me.id);
        },
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
        loginUser: async (root, args, context, info) => {
            return {
                ...(await attemptLogin({ ...args })),
            };
        },
    },
};
