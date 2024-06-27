import prisma from '@/configs/prisma';
import { s3Client } from '@/configs/s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

export const typeDefs = `#graphql 
    type File {
      originalFilename: String
      uuid: String
      metadata: String
      filepath: String
      filesize: Float
    }

    type Query {
        getFiles: [File]
        file: File
    }

    type Mutation {
      createPresignedUrl(originalFilename: String!): String
    }
`;

export const resolvers = {
  Query: {
    async file(_: any, { id }: { id: number }) {
      return await prisma.file.findUnique({
        where: { id: id }
      });
    },
    async getFiles() {
      return await prisma.file.findMany();
    }
  },

  Mutation: {
    async createPresignedUrl(_: any, { originalFilename }: any) {
      const fileUuid = crypto.randomUUID()
      const filepath = "file"

      const command = new PutObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: `${filepath}/${fileUuid}` });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

      await prisma.file.create({
        data: {
          originalFilename,
          uuid: fileUuid,
          filepath
        }
      })
      return url;
    }
  }
};
