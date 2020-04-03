import {
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from "redux-bundler";

import cache from "../utils/cache";
import routes from "./routes";

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  createUrlBundle(),
  routes
);
