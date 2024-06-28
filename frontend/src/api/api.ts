import { gql, request } from "graphql-request";
import GetFilesResponse from "../types/GetFilesResponse";
import File from "../types/File";
import GetOneFileResponse from "../types/GetOneFileResponse";

const createPresignedUrlQuery = gql`
  mutation CreatePresignedUrl($originalFilename: String!) {
    createPresignedUrl(originalFilename: $originalFilename)
  }
`;

export const createPresignedUrl = async ({
  originalFilename,
  path,
}: {
  originalFilename: string;
  path?: string;
}): Promise<any> => {
  try {
    return await request(
      import.meta.env.VITE_GRAPHQL_ENDPOINT,
      createPresignedUrlQuery,
      {
        originalFilename,
        path,
      }
    );
  } catch (e) {
    console.error(e);
  }
};

const getFilesQuery = gql`
  query GetFiles($searchQuery: String) {
    getFiles(searchQuery: $searchQuery) {
      originalFilename
      uuid
      metadata
      filepath
      filesize
    }
  }
`;

export const getFiles = async (
  searchQuery?: string
): Promise<File[] | undefined> => {
  try {
    const response = await request<GetFilesResponse>(
      import.meta.env.VITE_GRAPHQL_ENDPOINT,
      getFilesQuery,
      { searchQuery }
    );
    return response.getFiles;
  } catch (e) {
    console.error(e);
  }
};

const createDownloadPresignedUrlQuery = gql`
  mutation CreateDownloadPresignedUrl($uuid: String!, $path: String!) {
    createDownloadPresignedUrl(uuid: $uuid, path: $path)
  }
`;

export const createDownloadPresignedUrl = async ({
  uuid,
  path,
}: {
  uuid: string;
  path?: string;
}): Promise<any> => {
  try {
    return await request(
      import.meta.env.VITE_GRAPHQL_ENDPOINT,
      createDownloadPresignedUrlQuery,
      {
        uuid,
        path,
      }
    );
  } catch (e) {
    console.error(e);
  }
};

const getOneFileQuery = gql`
  query GetOneFile($uuid: String!) {
    getOneFile(uuid: $uuid) {
      originalFilename
      uuid
      metadata
      filepath
      filesize
    }
  }
`;

export const getOneFile = async (uuid: string): Promise<File | undefined> => {
  try {
    const response = await request<GetOneFileResponse>(
      import.meta.env.VITE_GRAPHQL_ENDPOINT,
      getOneFileQuery,
      { uuid }
    );

    return response.getOneFile;
  } catch (e) {
    console.error(e);
  }
};
