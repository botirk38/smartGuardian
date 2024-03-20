
interface EmailTemplateProps {
  firstName: string;


}

export const EmailTemplate: React.FC<ReadOnly<EmailTemplateProps>> = ({ firstName }) => {

  return (

    <div className="bg-white dark:bg-gray-950 -mx-6 px-6 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 xl:px-8 pt-6 pb-8">
            <div className="flex items-center space-x-4">
              <Image
                alt="Acme"
                className="rounded-full"
                height="48"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "48/48",
                  objectFit: "cover",
                }}
                width="48"
              />
              <h1 className="text-lg font-bold tracking-tight">Acme Inc</h1>
            </div>
          </div>
          <div className="px-4 sm:px-6 xl:px-8 pb-8">
            <div className="space-y-4">
              <p className="text-base leading-6">
                Thanks for signing up! We just need you to confirm your email address to complete the signup.
              </p>
              <div className="mt-6">
                <Button size="sm">Confirm Signup</Button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-850 px-4 sm:px-6 xl:px-8 py-8">
            <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
              You received this email because you signed up for our services. If you have any questions, you can contact
              us at
              <Link href="#">info@example.com</Link>.
            </p>
          </div>
        </div>
        <div className="mt-6 text-center text-sm leading-5">
          <p className="text-gray-500 dark:text-gray-400">Follow us on social media</p>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <Link
              className="rounded-full w-6 h-6 flex items-center justify-center border border-gray-200 dark:border-gray-800 border-gray-200 dark:border-gray-800"
              href="#"
            >
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="w-4 h-4 fill-[#1da1f2]" />
            </Link>
            <Link
              className="rounded-full w-6 h-6 flex items-center justify-center border border-gray-200 dark:border-gray-800 border-gray-200 dark:border-gray-800"
              href="#"
            >
              <span className="sr-only">Facebook</span>
              <FacebookIcon className="w-4 h-4 fill-[#1877f2]" />
            </Link>
            <Link
              className="rounded-full w-6 h-6 flex items-center justify-center border border-gray-200 dark:border-gray-800 border-gray-200 dark:border-gray-800"
              href="#"
            >
              <span className="sr-only">Instagram</span>
              <InstagramIcon className="w-4 h-4 fill-[#c13584]" />
            </Link>
          </div>
        </div>
      </div>
    </div>



  );


}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kfRtavQkQD6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link"


function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

