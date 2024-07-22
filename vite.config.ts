import react from "@vitejs/plugin-react";
import path from "path";
import { telefunc } from "telefunc/vite";
import vike from "vike/plugin";
import { UserConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default {
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        react(),
        vike(),
        telefunc(),
        cjsInterop({
            dependencies: ["@mui/material/**"],
        }),
    ],
    // optimizeDeps: {
    //     include: ["react-dom/client"],
    // },
} satisfies UserConfig;
