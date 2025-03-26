import SignInForm from '@/_components/core/Authentication/SignInForm'
import React from 'react'
import Head from 'next/head'
const index = () => {
  return (
    <>
    <Head>
        <title>Sign In | Register</title>
        <meta name="description" content="Sign In or Register" />
    </Head>
    <div><SignInForm/></div>
    </>
  )
}

export default index