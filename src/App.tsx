import React from "react";
import { Provider } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import Album from "./application/Album";
import Home from "./application/Home";
import Rank from "./application/Rank";
import Recommend from "./application/Recommend";
import Singers from "./application/Singers";
import { IconStyle } from "./assets/iconfont/iconfont";
import { store } from "./store";
import { GlobalStyle } from "./style";

type Props = {};

const App: React.FC<Props> = (props) => {
  const routeElements = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Navigate to="/recommend" />,
        },
        {
          path: "recommend",
          element: <Recommend />,
          children: [
            {
              path: ":id",
              element: <Album />,
            },
          ],
        },
        {
          path: "singers",
          element: <Singers />,
        },
        {
          path: "rank",
          element: <Rank />,
          children: [
            {
              path: ":id",
              element: <Album />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <IconStyle />
      {routeElements}
    </Provider>
  );
};

export default App;
