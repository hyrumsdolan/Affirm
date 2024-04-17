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
    clauderesponses: [clauderesponse]
  }
type clauderesponse {
  claudeId: ID!
  body: String
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
    updateEntry(_id: ID!, gratefulFor: [String], dailyAffrimations: [String], ultimateAffirmation: String): Entry
    deleteEntry(_id: ID!): Entry
    callClaude(input: String!): User
    addBigDream(bigDream: String!): User
    addLittleDreams(littleDreams: [String!]!): [LittleDreams]
    addUltimateGoal(ultimateGoal: String!): Dream
    createEntry(gratefulFor: [String!]!, dailyAffirmations: [String!]!, ultimateAffirmation: String!): Entry
  }
`;

module.exports = typeDefs;
