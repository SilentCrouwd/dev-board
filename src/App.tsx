import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Views/Root/Root";
import BoardOverview from "./Views/BoardOverview/BoardOverview";
import BoardDetail from "./Views/BoardDetail/BoardDetail";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "boards",
          children: [
            { index: true, element: <BoardOverview /> },
            { path: ":id", element: <BoardDetail /> },
          ],
        },
      ],
    },
  ],
  { basename: "dev-board" },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
