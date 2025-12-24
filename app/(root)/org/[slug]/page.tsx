"use client"
import Nav from '@/app/components/nav'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { createBlog } from './action'
import { useOrganization } from '@clerk/nextjs'

function OrgLanding() {
    const [blogContent, setBlogContent] = React.useState('')
    const [blogTitle, setBlogTitle] = React.useState('')
    const organization = useOrganization()
    const handleCreateBlog = async () => {
        // Call the server action to create a blog
        createBlog({ title: blogTitle, content: blogContent,orgId: organization.organization?.id || '' })
    }
  return (
    <>
     <Nav></Nav>
    <div className='p-10'>
        <input type='text' placeholder='Blog Title' className='border border-black-3px p-2 w-full mb-2' value={blogTitle} onChange={(e) => setBlogTitle(e.target.value) } />
        <Textarea placeholder='Type something here...' value={blogContent} onChange={(e) => setBlogContent(e.target.value)} />
       
        <Button onClick={handleCreateBlog} className='border border-black-3px bg-green-500 mt-2'>+ Create a Blog</Button>
    </div>
    </>
  )
}

export default OrgLanding