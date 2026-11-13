import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("/welcome", "./routes/welcome.tsx"),
    route("/map", "./routes/map.tsx"),
    route("/space", "./routes/space.tsx"),
] satisfies RouteConfig;

