import ProtectedLayout from "@/app/protected-layout";

import React from 'react'
import NewPost from '@/components/NewPost'

export default function page() {
  return (
    <>
      <ProtectedLayout>
        <div>
          <h1 className="page-title">Create new post</h1>
            <div>
                <NewPost />
            </div>
        </div>
      </ProtectedLayout>
    </>
  )
}
