// add the beginning of your app entry
import "vite/modulepreload-polyfill";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
}

export default App;
