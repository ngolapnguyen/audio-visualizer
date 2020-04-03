import { createRouteBundle, createSelector } from "redux-bundler";
import TemplateDefault from "../templates/Default";
import MainScene from "../pages/MainScene";
import NotFound from "../pages/NotFound";

const bundle = createRouteBundle({
  "/": {
    name: "Main Scene",
    C: MainScene
  },
  "*": {
    name: "NotFound",
    public: true,
    C: NotFound
  }
});

bundle.selectRouteName = createSelector("selectRoute", route => route.name);

bundle.selectRouteTitle = createSelector(
  "selectRoute",
  route => route.title || route.name
);

bundle.selectRouteIsPublic = createSelector(
  "selectRoute",
  route => route.public || false
);

bundle.selectRouteComponent = createSelector("selectRoute", route => {
  return route.C || (() => null);
});

bundle.selectRouteTemplate = createSelector("selectRoute", route => {
  return route.Template || TemplateDefault;
});

export default bundle;
