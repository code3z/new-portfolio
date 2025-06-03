import { roles } from "@/lib/roles";
import sun from "@/public/sun.svg";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function WritingLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) {
  const roleData = roles.find((r) => r.key === role);

  return (
    <div className="relative overflow-hidden min-h-screen">
      <Head>
        <title>{roleData?.org} | Ian Cheshire&apos;s portfolio</title>
      </Head>
      <motion.div
        className="responsive-container mt-7"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
      >
        <Link href="/">
          <svg
            data-slot="icon"
            aria-hidden="true"
            fill="none"
            className="icon mr-2"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          Go Back
        </Link>
        <div className="w-fit mt-8">
          <h1 className="text-4xl sm:text-7xl font-bold">{roleData?.org}</h1>
          <div className="bg-theme-red/90 w-full h-3 sm:h-6 -mt-3 sm:-mt-6" />
        </div>
        <p
  className="text-tan text-lg font-semibold mt-3 max-w-2xl"
  dangerouslySetInnerHTML={{ __html: roleData?.description || '' }}
></p>
        <div className="mt-3 prose pb-16">{children}</div>
      </motion.div>
      <motion.div
        initial={{ rotate: 90 * 2 }}
        animate={{ rotate: 0 }}
        exit={{ rotate: 90 * 2 }}
        transition={{ duration: 2 }}
        className="-mb-64 lg:mb-0 mx-auto sm:-mr-48 lg:m-0 lg:absolute -bottom-48 -right-48 w-96 h-96"
      >
        <Image src={sun} alt="" className="" />
      </motion.div>
    </div>
  );
}
