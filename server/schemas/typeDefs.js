
const typeDefs = `
type User {
    _id: ID
    firstName: String
    email: String
    password: String
    entries: [Entry]
  }
  
  type Entry {
    _id: ID
    title: String
    content: String
    createdAt: String
    updatedAt: String
  }
  
  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
    entries: [Entry]
    entry(_id: ID!): Entry
  }
  
  type Mutation {
    addUser(firstName: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    createEntry(title: String!, content: String!): Entry
    updateEntry(_id: ID!, title: String, content: String): Entry
    deleteEntry(_id: ID!): Entry
  }
  `;
  
  module.exports = typeDefs;