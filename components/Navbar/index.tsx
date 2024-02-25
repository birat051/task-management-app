import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import { signOut } from 'next-auth/react'

function Navbar() {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/signin' }) // Redirect to signin page after signout
    }
    return (
    <header className={styles.navbar}>
        <h1>Task Management</h1>
        <nav >
            <ul>
                {/* <li>
                    <Link href={'/'} >Home</Link>
                </li>
                <li>
                    <Link href={'/signin'}>Login</Link>
                </li> */}
                <li>
                    <button onClick={handleSignOut}>Signout</button>
                </li>
            </ul>
        </nav>
    </header>
    )
}

export default Navbar