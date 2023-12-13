import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { UserMyPages } from "./pages/UserMyPages";
import { AboutProject } from "./pages/AboutProject";
import { CollectionPage } from "./pages/CollectionPage";
import { CollectionListPage } from "./pages/CollectionListPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      { path: "/", element: <Home></Home>, index: true },
      { path: "/search", element: <Search></Search> },
      { path: "/about", element: <AboutProject></AboutProject> },
      { path: "/userpage", element: <UserMyPages></UserMyPages> },
      { path: "/:collectionName", element: <CollectionPage></CollectionPage> },
      {
        path: "/all-collections",
        element: <CollectionListPage></CollectionListPage>,
      },
    ],
  },
]);
