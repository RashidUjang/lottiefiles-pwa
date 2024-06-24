export const typeDefs = `#graphql 
    type File {
        id: ID!
        metadata: String!
    }

    type Query {
        files: [File]
    }
`;

export const resolvers = {
  Query: {
    files() {
      // TODO: Remove and replace with actual DB queries
      const files = [
        { id: '1', metadata: 'test1' },
        { id: '2', metadata: 'test2' },
      ];
      return files;
    }
  }
};
