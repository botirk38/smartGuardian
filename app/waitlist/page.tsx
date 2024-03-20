import Image from "next/image"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <div>
      <div>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full max-w-md flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm flex flex-col items-center space-y-3">
              <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-900 w-full flex items-center justify-center">
                <MailIcon className="h-6 w-6" />
                <h1 className="text-lg font-bold ml-3 text-green-800">Welcome to the Waitlist!</h1>
              </div>
              <p className="text-sm  text-gray-500 text-center leading-loose">
                You are now part of an exclusive group. Get ready for early access to our new features, special offers,
                and more.
              </p>
            </div>

            <Link className="flex flex-1 justify-center" href="/">
              <Button className="w-full max-w-sm bg-green-800 text-white" variant="outline">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

