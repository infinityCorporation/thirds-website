import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./routes/welcome.tsx"),
    route("/map", "./routes/map.tsx"),
    route("/space", "./routes/space.tsx"),
    route("/signup", "./routes/signup.tsx"),
    route("/login", "./routes/login.tsx"),
    route("/profile", "./routes/profile.tsx"),
] satisfies RouteConfig;

