import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      { path: "/", element: <Home></Home>, index: true },
      //   {path:"/search", element:<SearchPage></SearchPage>},
      //   {path:"/userpage", element:<UserPage></UserPage>},
      //   {path:"/:collectionName", element:<CollectionPage></CollectionPage>},
    ],
  },
]);
