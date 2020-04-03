import React from "react";
import "./styles/index.css";
import { useConnect } from "./libs/redux-bundler-react";
import Helmet from "react-helmet";
import { getNavHelper } from "internal-nav-helper";

function App() {
  const {
    doUpdateUrl,
    routeTitle,
    routeComponent: Page,
    routeTemplate: Template
  } = useConnect("selectRouteComponent", "selectRouteTemplate", "doUpdateUrl");

  const onNav = React.useCallback(getNavHelper(doUpdateUrl), [doUpdateUrl]);

  return (
    <>
      <Helmet>
        <title>Hello ThreeJs!</title>
      </Helmet>

      <Template routeTitle={routeTitle} onClick={onNav}>
        <Page />
      </Template>
    </>
  );
}

export default App;
