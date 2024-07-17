import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { UserConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
// import aliasHq from "alias-hq";
// import ssr from "vike/plugin";

export default {
    plugins: [
        react(),
        vike(),
        cjsInterop({
            dependencies: ["@mui/material/**"],
        }),
    ],
    // resolve: {
    //     alias: {
    //         ...aliasHq.get("rollup"),
    //     },
    // },
} satisfies UserConfig;
