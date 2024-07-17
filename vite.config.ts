import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { UserConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default {
    plugins: [
        react(),
        vike(),
        cjsInterop({
            dependencies: ["@mui/material/**"],
        }),
    ],
} satisfies UserConfig;
