const typeDefs = `
  type User {
    _id: ID
    firstName: String
    email: String
    password: String
    pageProgress: Int
    dream: Dream
    entries: [Entry]
    theme: String
  }

  type LittleDreams {
    _id: ID
    littleDream: String
    selected: Boolean
  }

  type Dream {
    _id: ID
    bigDream: String
    littleDreams: [LittleDreams]
    ultimateGoal: String
  }

  type Entry {
    _id: ID
    gratefulFor: [String]
    dailyAffirmations: [String]
    ultimateAffirmation: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    myDream: Dream
    entries: [Entry]
    entry(_id: ID!): Entry
  }

  type Mutation {
    addUser(firstName: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    createEntry(title: String!, content: String!): Entry
    updateEntry(_id: ID!, title: String, content: String): Entry
    deleteEntry(_id: ID!): Entry
    callClaude(input: String!): String
    addBigDream(bigDream: String!): Dream
    addLittleDreams(littleDreams: [String!]!): [LittleDreams]
    addUltimateGoal(ultimateGoal: String!): Dream
  }
`;

module.exports = typeDefs;