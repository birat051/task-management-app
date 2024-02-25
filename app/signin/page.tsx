'use client'

import SigninState from '@/hooks/SigninState'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'
import styles from '../signup/page.module.css'
import formstyle from '../../components/AddTask/addtask.module.css'
import { database } from '@/clientdb/db'
import ClientUser from '@/clientdb/DAO/UserDao'
import UserDetails from '@/services/UserDetails'

function Signin() {
  const [email,password,onChangeEmail,onChangePassword,validateEmail,validatePassword]=SigninState()
  const [loading,setloading]=useState(false)
  const router=useRouter()
  const onFormSubmit=async (e:React.FormEvent)=>{
    console.log('Called submit')
    e.preventDefault()
    if(!validateEmail())
    return
    setloading(true)
    const res= await signIn("credentials",{
      email:email,
      password: password,redirect:false
    })
    setloading(false)
    console.log('Signin response is: ',res)
    if(res?.ok!=true)
    {
      alert('Wrong email and password combination')
    }
    else
    {
      const {emailId,userId,name,message}=await UserDetails.getUserDetailsByEmail(email)
      if(!message)
      {
        console.log('Creating user in local DB')
        // console.log('User id is: ',userId)
        await ClientUser.createUser({name,emailId,userId})
      }
      router.push('/')
    }
  }

  return (
    <LoadingOverlayWrapper active={loading}>
    <main className={styles.signup}>
    <Head>
        <title>Signin</title>
    </Head>
    <form onSubmit={onFormSubmit} className={formstyle.addtaskform}>
       <label>
        Email address
        </label>
        <input type='text' placeholder='Enter your email address' value={email as string} onChange={onChangeEmail as React.ChangeEventHandler<HTMLInputElement>}/>
        <label>
        Password
        </label>
        <input type='password' placeholder='Enter your password'  value={password as string} onChange={onChangePassword as React.ChangeEventHandler<HTMLInputElement>}/>
        <button type="submit" className='primary-button'>Signin</button>
    </form>
    <p>Don't have an account? <Link href={'/signup'}>Signup</Link></p>
    </main>
    </LoadingOverlayWrapper>
  )
}

export default Signin