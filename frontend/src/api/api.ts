import { gql, request } from "graphql-request";
import GetFilesResponse from "../types/GetFilesResponse";
import File from "../types/File";

const createPresignedUrlQuery = gql`
  mutation CreatePresignedUrl($originalFilename: String!) {
    createPresignedUrl(originalFilename: $originalFilename)
  }
`;

export const createPresignedUrl = async (
  originalFilename: string
): Promise<any> => {
  try {
    return await request(
      import.meta.env.VITE_GRAPHQL_ENDPOINT,
      createPresignedUrlQuery,
      {
        originalFilename,
      }
    );
  } catch (e) {
    console.error(e);
  }
};

const getFilesQuery = gql`
  query GetFiles {
    getFiles {
      originalFilename
      uuid
      metadata
      filepath
      filesize
    }
  }
`;

// TODO: Add search query
export const getFiles = async (): Promise<File[] | undefined> => {
  try {
    const response = await request<GetFilesResponse>(import.meta.env.VITE_GRAPHQL_ENDPOINT, getFilesQuery);
    return response.getFiles
  } catch (e) {
    console.error(e);
  }
};
