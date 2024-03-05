import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import PlaylistPage from "./pages/PlaylistPage";
import PlaylistDetails from "./pages/PlaylistDetails";

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
        path: "/details/:bookId",
        element: <DetailsPage />,
      }, {
        path: "/playlist",
        element: <PlaylistPage/>
      }, {
        path: "/playlist/details/:playlistId",
        element: <PlaylistDetails/>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
