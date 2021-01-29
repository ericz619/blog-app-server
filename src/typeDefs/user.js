import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        me: User! @auth
    }

    extend type Mutation {
        registerUser(
            fullName: String!
            email: String!
            password: String!
        ): RegisterResponse!
        loginUser(email: String!, password: String!): LoginResponse!
    }

    type RegisterResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
    }

    type LoginResponse {
        ok: Boolean!
        accessToken: String
        refreshToken: String
        errors: [Error!]
    }

    type User {
        id: ID!
        fullName: String!
        email: String!
        password: String!
        createdAt: String!
    }
`;
