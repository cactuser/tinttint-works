import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layout/RootLayout.tsx";
import FilterSearchPage from "./pages/filter-search/route.tsx";
import PhotographBookPage from "./pages/photograph-book/route.tsx";
import UploadPhotoPage from "./pages/upload-photo/route.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // upload-photo as default route
        index: true,
        element: <Navigate to="/upload-photo" replace />,
      },
      {
        path: "upload-photo",
        element: <UploadPhotoPage />,
      },
      {
        path: "filter-search",
        element: <FilterSearchPage />,
      },
      {
        path: "photograph-book",
        element: <PhotographBookPage />,
      },
    ],
  },
]);

export default router;
