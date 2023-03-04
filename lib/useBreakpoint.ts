import create from "@kodingdotninja/use-tailwind-breakpoint"
import resolveConfig from "tailwindcss/resolveConfig"

import tailwindConfig from "@/tailwind.config.js"

const config = resolveConfig(tailwindConfig)
if (!config.theme) throw new Error("No theme found in tailwind config")
export const { useBreakpoint } = create(config.theme.screens)
