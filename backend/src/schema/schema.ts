import prisma from '@/configs/prisma';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";

export const typeDefs = `#graphql 
    type File {
      filename: String
      mimetype: String
      encoding: String
      metadata: String
    }

    type Query {
        files: [File]
        file: File
    }

    type Mutation {
      uploadFile(metadata: String!): File
    }
`;

export const resolvers = {
  Query: {
    async file(_: any, { id }: { id: number }) {
      return await prisma.file.findUnique({
        where: { id: id }
      });
    },
    async files() {
      return await prisma.file.findMany();
    }
  },

  Mutation: {
    uploadFile(_: any, { metadata }: any) {
      return { metadata };
    }
  }
};
