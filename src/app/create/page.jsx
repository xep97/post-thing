import React from 'react'
import NewPost from '@/components/NewPost'

export default function page() {
  return (
    <>
        <div>
          <h1 className="page-title">Create new post</h1>
            <div>
                <NewPost />
            </div>
        </div>
    </>
  )
}
