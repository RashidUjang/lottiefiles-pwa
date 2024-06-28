import React from "react";
import ReactDOM from "react-dom/client";
import PageFileList from "./routes/pages/PageFileList.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageFileDetail from "./routes/pages/PageFileDetail.tsx";
import Shell from "./routes/layout/Shell.tsx";
import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { path: "/", element: <PageFileList /> },
      { path: "/:uuid", element: <PageFileDetail /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
