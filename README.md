# Documentation

The below details out the information to get started with the project locally, followed by the understanding on the requirements, as well as the design decisions taken.

## Getting Started with Local Development

1. In the root folder of the repository, run the below command to setup local version of the required services (i.e. PostgreSQL, LocalStack S3). 
    
    ```jsx
    make up-local
    ```
    
    *Note: The repo contains a Makefile to shorten the command to run during setup. Under the hood, it is using Docker Compose.*
    
2. Install the dependencies in both the `backend` and `frontend` folder
    
    ```jsx
    yarn
    ```
    
3. In both folders, create a copy of the `.env.example` file and rename it to `.env` . This file contains all the keys that needs to be filled in. For local development, it is already committed to the repository.
4. Run the below command in the `backend` folder to bring up the backend service
    
    ```jsx
    yarn dev
    ```
    
5. Repeat step 4 in the `frontend` folder to bring up the frontend

## Requirements

This section represents the understanding of the requirements

### Functional Requirements

- Users are able to perform the below actions:
    - Upload a `.lottie` or `.json` file
    - Download the uploaded file
    - Search for a file
    - See a list uploaded files
    - See the file preview
- Users will use the application with spotty connections and thus require a good offline experience with a PWA

### Technical Requirements

- The below stack is mandatory to be used in the application
    - GraphQL
    - React
    - State Management Library

### Assumptions

- The application will grow, so scalability of code and technology choices will be important.

### Not In Scope

- Authentication
    - Chose not to do this, but it would be simple to integrate with many OOTB authentication solutions such as Auth0, WorkOS, Clerk

## Design Decisions

Below outlines the architecture of the application.

![Untitled_Diagram drawio_(1)](https://github.com/RashidUjang/lottiefiles-pwa/assets/11313829/106a4d36-6e8f-4aa3-9556-68d284441ddd)

**Where do we store the files?**

- We are faced with a choice to store either in a transactional DB or a blob storage. Ultimately, the choice was to store in blob storage. The reason for this is given below:
    - Keeps the DB lean and not bogged down without any files. This can speed up backups and other operations
    - Much cheaper to store long term
- Of course, we also have drawbacks to this choice, which we acknowledge:
    - Easier to accidentally expose files
        - Mitigation: Learn S3 best practices and implement them (permissions, hardening, etc.)
    - Increase in complexity. Since we are storing in S3, there are more moving parts than just having a database and we have to generate presigned URLs.
        - Mitigation: Invest in proper coding practices to not introduce accidental complexity, only necessary complexity.

**Should we have a backend?**
- It’s possible to tackle this application without a backend by uploading directly to S3 from the client, but a backend was chosen to give room to expand in the future as scalability is important.

### Technology choices

**PostgreSQL**

Good, reliable general purpose database. This was chosen over non-relational databases as relational databases generally have better write scalability than non-relational DBs such as MongoDB. I also have a personal preference for schema-on-write.

**Vite**

It has gotten stable enough over the years that its worthwhile to start new projects using Vite over CRA. 

**React Query**

React Query offers a great developer experience as integrating can be done really quickly and offers great benefits in terms of an opaque cache and server-state sync. Alternative options considered are Jotai, Zustand, Redux, Mobx but I chose React Query to give a quick MVP.

**AWS S3**

I’m most familiar with AWS services.

**ShadCN UI**

Gives a great, simple look at a fraction of developer time. Not a dependency which reduces package size.

**Apollo Server + Express**

Chose to still use Express along with Apollo Server for the GraphQL portion. This is to introduce extensibility, especially for authentication which will require a backend framework to coordinate between the two different API types.

### DB Columns

`id` - ID of the File

`originalFilename` - The filename the File had

`uuid` - The UUID of the File in the blob storage

`filepath` - The path in which it’s stored in the blob storage

`filesize` - The size of the file

`metadata` - The related Lottie Files metadata of the file

### Deployment Information

The below technologies were used for deploying the application:

- Vercel
- AWS EC2
- AWS S3
- Supabase
- PM2

## Future Improvements

The below are some things that were planned to be implemented, but was not

- Add support for viewing `.lottie` files
- Add authentication
- Implement PWA properly
