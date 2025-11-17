import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <>
        <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center justify-items-start'>
              <Image
                className="dark:invert"
                src="/file.svg"
                alt="Post something"
                width={60}
                height={20}
                priority
              />
              <h1>Post something</h1>
            </div>
            
            <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
              <a
                className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                href="posts"
                rel="noopener noreferrer"
              >
                Read posts
              </a>
              <a
                className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                href="my-posts"
                rel="noopener noreferrer"
              >
                My posts
              </a>
              <a
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                href="create"
                rel="noopener noreferrer"
              >
                <Image
                  className="dark:invert"
                  src="/file.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={16}
                />
                New post
              </a>
              <a
                className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                href="post/762c6994-ad71-4fcf-b1cc-e7d8514b38a2"
                rel="noopener noreferrer"
              >
                Example post
              </a>

          </div>
        </div>
    </>
  )
}
