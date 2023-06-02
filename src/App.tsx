import { lazy, Suspense, createElement } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Index from "./pages/index";

function generateRoutes() {
  const modules = import.meta.glob("./pages/**/*.tsx");
  const routes: RouteObject[] = [];

  Object.keys(modules)
    .filter((path) => !isComponent(path))
    .forEach((path) => {
      console.log(generateRoutePath(path));
    });

  return routes;
}
// const routes = generateRoutes();

function generateRoutePath(path: string) {
  path = path.replace("./pages", "");
  path = path.replace("/index.tsx", "");
  path = path.replace(".tsx", "");
  path = path.replace(/\[([^\]]*)\]/g, ":$1");
  path = path || "/";

  return path;
}

function isComponent(path: string) {
  return /components?/.test(path);
}

function isLayout(path: string) {
  return path.includes("layout.tsx");
}

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
    element: lazyLoad(() => import("./pages/login")),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
