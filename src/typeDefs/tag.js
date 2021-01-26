import { gql } from 'apollo-server-express';

export default gql`
    type Tag {
        id: ID!
        name: String!
        createdAt: String!
    }
`;
