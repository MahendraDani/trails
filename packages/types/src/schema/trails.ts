import { z } from "zod";

export enum Languages {
  c = "c",
  cpp = "cpp",
  java = "java",
  python = "python",
  go = "go",
  rust = "rust",
  kotlin = "kotlin",
  dart = "dart",
  flutter = "flutter",
  javascript = "javascript",
  typescript = "typescript",
  react = "react",
  html = "html",
  txt = "txt",
  md = "md",
  yaml = "yaml",
  json = "json",
  toml = "toml",
}

export const ZCreateTrailSchema = z.object({
  trailName: z
    .string()
    .describe("The name of new trail")
    .min(1, { message: "Trail name is required" })
    .max(255, { message: "Name should not exceed 255 characters" }),
  trailDescription: z
    .string()
    .describe("A short description of trail")
    .max(255, { message: "Description should not exceed 255 characters" }),
  trailContent: z
    .string()
    .describe("The content of trail.")
    .min(1, { message: "Trail content is required" }),
  trailLanguage: z.nativeEnum(Languages),
});
