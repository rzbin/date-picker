import { parseArgs } from "util";


const BANNER = `/*
THIS IS A BUNDLED FILE BY BUN
if you want to view the source, please visit the github repository of this plugin
*/
`;

const { values } = parseArgs({
    args: Bun.argv,
    options: {
        prod: {
            type: "boolean",
            default: false,
        },
    },
    strict: true,
    allowPositionals: true,
});
const isProd = values.prod;

console.log(`Building for ${isProd ? "production" : "development"}...`);

await Bun.build({
    banner: BANNER,
    entrypoints: ["./src/main.ts"],
    outdir: ".",
    external: [
        "obsidian",
        "electron",
        "@codemirror/autocomplete",
        "@codemirror/collab",
        "@codemirror/commands",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/view",
        "@lezer/common",
        "@lezer/highlight",
        "@lezer/lr"],
    minify: isProd,
    sourcemap: isProd ? false : "inline",
    format: "cjs",
    target: "node",
});
