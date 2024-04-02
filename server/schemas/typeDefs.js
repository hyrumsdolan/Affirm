
const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        entries: [Entry]
    }

    type Entry {
        entryID: ID
        date: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
