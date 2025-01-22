import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Admin = () => {
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href="/" className="cursor-pointer">
                <Image 
                    src="/assets/icons/logo-full.svg"
                    height={32}
                    width={162}
                    alt="Logo"
                    className='h-8 w-fit'
                    />
            </Link>
        </header>
    </div>
  )
}

export default Admin