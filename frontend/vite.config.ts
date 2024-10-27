import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  build: {
    // generate .vite/manifest.json in outDir
    // manifest: true,
    outDir: "dist",
    rollupOptions: {
      // overwrite default .html entry
      // input: "/path/to/main.tsx",
      // input: { main: "src/main.tsx" },
      // output: {
      //   manualChunks: {
      //     vendor: ["react", "react-dom"],
      //     // Add more custom chunks as needed
      //   },
      //   //   minifyInternalExports: true,
      // },
    },
  },
});
