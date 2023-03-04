import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Poppins } from "next/font/google"
import styles from "@/styles/Home.module.css"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
    </div>
  )
}
