import { lazy, Suspense, createElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/index";

const lazyLoad = (src: any) => (
  <Suspense fallback={<>...</>}>{createElement(lazy(src))}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: lazyLoad(() => import("@/pages/login")),
  },
  {
    path: "/registry",
    element: lazyLoad(() => import("@/pages/registry")),
  },
  {
    path: "/home",
    element: lazyLoad(() => import("@/pages/home")),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
