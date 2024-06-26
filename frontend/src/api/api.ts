import { gql, request } from "graphql-request";

const qry = gql`
  mutation UploadFile($metadata: String!) {
    uploadFile(metadata: $metadata) {
      metadata
    }
  }
`;

const variables = { metadata: "123" };

export const createPreSignedUrl = async (mutation: any) => {
  try {
    return await request(import.meta.env.VITE_GRAPHQL_ENDPOINT, qry, variables);
  } catch (e) {
    console.error(e);
  }
};
