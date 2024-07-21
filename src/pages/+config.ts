export { config };
import type { Config } from "vike/types";
import vikeReact from "vike-react/config";
import vikeReactQuery from "vike-react-query/config";

const config = {
    title: "Movielandia24 - Vike SSR",
    stream: true,
    ssr: true,
    hydrationCanBeAborted: true,
    clientRouting: true,
    extends: [vikeReact, vikeReactQuery],
} satisfies Config;
