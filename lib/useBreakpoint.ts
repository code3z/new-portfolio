import create, {
  useIsomorphicEffect,
} from "@kodingdotninja/use-tailwind-breakpoint"
import resolveConfig from "tailwindcss/resolveConfig"

import tailwindConfig from "@/tailwind.config.js"
import { useRef, useState } from "react"

const config = resolveConfig(tailwindConfig)
if (!config.theme) throw new Error("No theme found in tailwind config")

// https://github.com/kodingdotninja/use-tailwind-breakpoint/blob/main/src/index.ts
export function useBreakpoint(
  breakpoint: string,
  defaultValue: boolean = false
) {
  const [match, setMatch] = useState(() => defaultValue)
  const matchRef = useRef(defaultValue)

  useIsomorphicEffect(() => {
    if (!(typeof window !== undefined && "matchMedia" in window))
      return undefined

    function track() {
      if (!config?.theme?.screens) {
        throw new Error("No screens found in Tailwind config")
      }
      if (
        Array.isArray(config.theme.screens) ||
        !config.theme.screens[breakpoint]
      ) {
        throw new Error(`No screen found for ${breakpoint}`)
      }

      const value = config.theme.screens[breakpoint] ?? "999999px"
      const query = window.matchMedia(`(min-width: ${value})`)
      matchRef.current = query.matches
      if (matchRef.current != match) {
        setMatch(matchRef.current)
      }
    }
    track()
    window.addEventListener("resize", track)
    return () => window.removeEventListener("resize", track)
  })

  return match
}
