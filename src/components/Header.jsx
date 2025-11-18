import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <>
        <div className='header'>
            <a href="/" className='header-logo'>
              <Image
                className="dark:invert"
                src="/file.svg"
                alt="Post something"
                width={60}
                height={20}
                priority
              />
              <h2>Post something</h2>
            </a>
            
            <nav className="header-nav">
              <a
                className="header-nav-link"
                href="find"
                rel="noopener noreferrer"
              >
                Find post
              </a>
              <a
                className="header-nav-link"
                href="posts"
                rel="noopener noreferrer"
              >
                All posts
              </a>
              <a
                className="header-nav-link"
                href="my-posts"
                rel="noopener noreferrer"
              >
                My posts
              </a>
              <a
                className="header-nav-link"
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
          </nav>
        </div>
    </>
  )
}
