"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {

  const {data: session} = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] =useState(false)

  useEffect(()=>{
    const setUpProviders =async ()=>{
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
        src="/assets/images/logo.svg"
        alt='PromptHarmonics Logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>PromptHarmonics</p>
      </Link>

      {/* Desktop Navigation*/}
    <div className='sm:flex hidden'>
      {session?.user ? (
        <div className='flex gap-4 md:gap-5'>
          <Link 
          href='/create-prompt'
          className='black_btn'>
            Create Post
          </Link>
          <button type='button' onClick={signOut} className='outline_btn'>
          Sign Out
          </button>
          <Link
          href='/profile'>
          <Image
          src={session?.user.image}
          alt='profile'
          width={37}
          height={37}
          className='rounded-full'
          />
          </Link>
        </div>
      ):( 
        <>
        {providers && Object.values(providers).map((provider)=>(
          <button 
          type='button'
          className='black_btn'
          key={provider.name}
          onClick={()=> signIn(provider.id)}>
            Sign In
          </button>
        ))}
        </>
      )}
    </div>

     {/* Mobile Navigation*/}
    <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className="flex">
              <Image
          src={session?.user.image}
          alt='profile'
          width={37}
          height={37}
          className='rounded-full cursor-pointer'
          onClick={()=>setToggleDropdown((prev)=> !prev)}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <Link
              className='dropdown_link'
              href='/profile'
              onClick={()=>setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
              className='dropdown_link '
              href='/create-prompt'
              onClick={()=>setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button
              type='button'
              onClick={()=>{
              setToggleDropdown(false)
              signOut()
            }}
              className='black_btn w-full'
              >
                Sign Out
              </button>
            </div>
          )}
            </div>
          ):(
            <>
            {providers && Object.values(providers).map((provider)=>(
              <button 
              type='button'
              className='black_btn'
              key={provider.name}
              onClick={()=> signIn(provider.id)}>
                Sign In
              </button>
            ))}
            </>
          )}
    </div>
    </nav>
  )
}

export default Nav