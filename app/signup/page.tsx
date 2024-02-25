'use client'

import SigninState from '@/hooks/SigninState'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import formstyle from '../../components/AddTask/addtask.module.css'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'
import { NextApiResponse } from 'next'

function Signup() {
  const router = useRouter()
  const [email,password,onChangeEmail,onChangePassword,validateEmail,validatePassword]=SigninState()
  const [loading,setloading]=useState(false)
  const [name,setName]=useState<string>('')
  const validateForm=()=>{
    if(name.length<3 || !name.includes(' '))
    {
        console.log('Name validation failed')
        alert('Enter your full name')
        return false
    }
    if(!validateEmail())
    {
        alert('Enter valid Email')
        return false
    }
    if(!validatePassword())
    {
        alert("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.")
        return false
    }
    return true
  }
  const onFormSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    if(!validateForm())
    return
    const url='/api/signup'
    const data = {
        name: name,
        email: email,
        password: password
      };
    setloading(true)
    fetch(url,{body: JSON.stringify(data),method: 'POST', headers: {
        'Content-Type': 'application/json'
      }}).then(async (res)=>{
        if(res.status===201)
        {
            alert('User has been successfully created')
            router.push('/signin')
        }
        else
        {
            setloading(false)
            const resData=await res.json()
            alert(resData.message)
        }
    }).catch(e=>{alert(e)
        setloading(false)
    })
  }
  return (
    <LoadingOverlayWrapper active={loading}>
    <main className={styles.signup}>
        <Head>
            <title>Signup</title>
        </Head>
        <form onSubmit={onFormSubmit} className={formstyle.addtaskform}>
           <label>
            Name
           </label>
           <input type='text' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}/>
           <label>
            Email address
            </label>
            <input type='text' placeholder='Enter your email address' value={email as string} onChange={onChangeEmail as React.ChangeEventHandler<HTMLInputElement>}/>
            <label>
            Password
            </label>
            <input type='password' placeholder='Enter your password'  value={password as string} onChange={onChangePassword as React.ChangeEventHandler<HTMLInputElement>}/>
            <button type="submit" className='primary-button'>Signup</button>
        </form>
        <p>Already have an account? <Link href={'/signin'}>Signin</Link></p>
    </main>
    </LoadingOverlayWrapper>
  )
}

export default Signup