import React from 'react'
import Head from 'next/head'

function HomePage() {
  return (
    <div>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
if (document.cookie && !document.cookie.includes('authed')) {
  window.location.href = "/login"
}`,
          }}
        />
      </Head>
      Welcome to Next.js!
    </div>
  )
}

export default HomePage
