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
  }
  
  type Mutation {
    addUser(firstName: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    deleteUser(_id: ID!): User
    setPageProgress(pageProgress: Int): User

    createEntry(gratefulFor: [String], dailyAffirmations: [String], ultimateAffirmation: String): Entry
    updateEntry(_id: ID!, gratefulFor: [String], dailyAffirmations: [String], ultimateAffirmation: String): Entry
    deleteEntry(_id: ID!): Entry

    updateDream(_id: ID, bigDream: String, littleDreams: [LittleDreamsInput], ultimateGoal: String): Dream

    callClaude(input: String!): String
  }

  input LittleDreamsInput {
    littleDream: String
    selected: Boolean
  }
  `;



// createEntry(gratefulFor: [String], dailyAffirmations: [String], ultimateAffirmation: String): Entry
// updateEntry(_id: ID!, gratefulFor: [String], dailyAffirmations: [String], ultimateAffirmation: String): Entry
// deleteEntry(_id: ID!): Entry

module.exports = typeDefs;
