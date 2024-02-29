import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/AdvancedSearchPage.tsx";
function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search", //
        element: <SearchPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
