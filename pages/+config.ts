export { config };
import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

const config = {
    title: "Movielandia24 - Vike SSR",
    stream: true,
    ssr: true,
    extends: vikeReact,
    hydrationCanBeAborted: true,
    clientRouting: true,
} satisfies Config;
