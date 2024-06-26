import { S3Client } from '@aws-sdk/client-s3';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? '';
const region = process.env.AWS_S3_REGION ?? '';

export const s3Client: S3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  region
});
