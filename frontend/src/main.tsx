import React from "react";
import ReactDOM from "react-dom/client";
import AppFileList from "./routes/pages/AppFileList.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppFileDetail from "./routes/pages/AppFileDetail.tsx";
import Shell from "./routes/layout/Shell.tsx";
import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { path: "/", element: <AppFileList /> },
      { path: "/:uuid", element: <AppFileDetail /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
