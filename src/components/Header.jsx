import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <>
        <div>
            <Image
                className="dark:invert"
                src="/file.svg"
                alt="Post something"
                width={100}
                height={20}
                priority
            />
            <h1>Post something</h1>
        </div>
    </>
  )
}
