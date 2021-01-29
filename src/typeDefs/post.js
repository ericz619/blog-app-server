import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        getPost(postID: ID!): Post! @auth
        getPosts: [Post]! @auth
    }

    extend type Mutation {
        createPost(
            title: String!
            body: String!
            tags: [String]! = []
            author: ID!
        ): CreatePostResponse! @auth
        removePost(postID: ID!): RemovePostResponse! @auth
        updatePost(
            postID: ID!
            title: String!
            body: String!
            tags: [String]! = []
            author: ID!
        ): UpdatePostResponse! @auth
    }

    type CreatePostResponse {
        ok: Boolean!
        post: Post!
        errors: [Error]!
    }

    type RemovePostResponse {
        ok: Boolean!
        errors: [Error]!
    }

    type UpdatePostResponse {
        ok: Boolean!
        post: Post!
        errors: [Error]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        tags: [String]!
        author: User!
        createdAt: String!
    }
`;
