import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <>
        <div className='header'>
            <a href="/" className='header-logo'>
              
              <h2>TimePost</h2>
            </a>
            
            <nav className="header-nav">
              <a
                className="header-nav-link"
                href="/find"
              >
                Find post
              </a>
              <a
                className="header-nav-link"
                href="/posts"
              >
                All posts
              </a>
              <a
                className="header-nav-link"
                href="/my-posts"
              >
                My posts
              </a>
              <a
                className="header-nav-link"
                href="/create"
              >
                New post
              </a>
          </nav>
        </div>
    </>
  )
}
