import React, { useState } from 'react'

function SigninState(): [string, string, (e: React.ChangeEvent<HTMLInputElement>) => void, (e: React.ChangeEvent<HTMLInputElement>) => void, () => boolean, () => boolean] {
  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const onChangeEmail=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }
  const onChangePassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }
  function validateEmail():boolean{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);    
  }
  function validatePassword():boolean {
    // Regular expression to validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    
    // Test the password against the regex pattern
    return passwordRegex.test(password);
}
  return [email,password,onChangeEmail,onChangePassword,validateEmail,validatePassword]
}

export default SigninState