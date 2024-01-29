import Link from 'next/link'

export default function NotFound() {
  return <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="flex items-center justify-center min-h-full place-items-center bg-secondary px-6 py-24 sm:py-32 lg:px-8">
         <h1 className="absolute mb-20 opacity-10 font-black text-15xl md:text-25xl lg:text-30xl text-neutral1">404</h1>
         <div className="relative text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral1 sm:text-5xl">Page not found</h1>
          <p className="pt-3 text-base leading-7 font-bold text-lg text-neutral1">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/home"
              className="z-1 rounded-md bg-neutral1 px-3.5 py-2.5 text-lg font-semibold text-secondary shadow-sm hover:bg-accent1 transition-colors duration-400 ease-in-out hover:neutral1"
            >
              Go back home
            </Link>

            {/* Possible log out button if you guys think it looks good? */}
            {/* <Link href="/" className="text-lg font-semibold text-neutral1">
              Log Out <span aria-hidden="true">&rarr;</span>
            </Link> */}
          </div>
        </div>
      </main>
  </>
}