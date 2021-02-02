import { User, Post } from '../models';

import formatError from '../formatError';

export default {
    Query: {
        getPost: (root, { postID }, context, info) => {
            return Post.findById({ _id: postID });
        },
        getPosts: (root, args, context, info) => {
            return Post.find({});
        },
    },
    Mutation: {
        createPost: async (root, args, context, info) => {
            try {
                const post = await Post.create({ ...args });
                return {
                    ok: true,
                    post,
                    errors: [],
                };
            } catch (e) {
                if (e) {
                    return {
                        ok: false,
                        errors: formatError(e),
                    };
                }
            }
        },
        removePost: async (root, { postID }, context, info) => {
            try {
                await Post.deleteOne({ _id: postID });
                return {
                    ok: true,
                    errors: [],
                };
            } catch (e) {
                if (e) {
                    return {
                        ok: false,
                        errors: formatError(e),
                    };
                }
            }
        },
        updatePost: async (root, { postID, ...args }, context, info) => {
            try {
                const post = await Post.findByIdAndUpdate(
                    postID,
                    {
                        $set: { ...args },
                    },
                    { returnOriginal: false, new: true }
                );

                return {
                    ok: true,
                    post,
                    errors: [],
                };
            } catch (e) {
                if (e) {
                    return {
                        ok: false,
                        errors: formatError(e),
                    };
                }
            }
        },
    },
    Post: {
        author: (root, args, context, info) => {
            return User.findById({ _id: root.author });
        },
    },
};
