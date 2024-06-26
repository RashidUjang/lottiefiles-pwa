import { gql, request } from "graphql-request";

const qry = gql`
  mutation CreatePresignedUrl($filename: String!) {
    createPresignedUrl(filename: $filename)
  }
`;

export const createPresignedUrl = async (filename: string): Promise<any> => {
  try {
    return await request(import.meta.env.VITE_GRAPHQL_ENDPOINT, qry, {
      filename,
    });
  } catch (e) {
    console.error(e);
  }
};
