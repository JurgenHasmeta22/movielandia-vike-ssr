import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { UserConfig } from "vite";
// import aliasHq from "alias-hq";
// import ssr from "vike/plugin";

export default {
    plugins: [react(), vike()],
    // resolve: {
    //     alias: {
    //         ...aliasHq.get("rollup"),
    //     },
    // },
} satisfies UserConfig;
