import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('')
  const {data:session} = useSession()
  const pathname = usePathname()
  const handleCopy =()=>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>{setCopied('')}, 3000)
  }

  return (
    <div className='prompt_card ' >
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items center gap-3 cursor-pointer'>
          <Image
          src={post.creator.image}
          alt='user_image'
          width={40}
          height={40}
          className='rounded-full object-contain'
          />
          <div className="flex flex-col">
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p> 
          </div>
        </div>
        <div className='copt_btn' onClick={handleCopy}>
            <Image
            src={copied == post.prompt ? 'assets/icons/tick.svg' : 'assets/icons/copy.svg'}
            alt='copt_logo'
            width={12}
            height={12} 
            className='cursor-pointer'
            />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700s'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient '> <span className='cursor-pointer' onClick={()=>handleTagClick && handleTagClick(post.tag)}>#{post.tag}</span></p>
   
   {session?.user.id ==  post.creator._id && pathname == '/profile' && (
    <div className='mt-5 flex justify-center text-center gap-4 border-t border-gray-100'>
      <p
      className='font-inter text-sm green_gradient ' 
      onClick={handleEdit}
      >
       <span className='cursor-pointer'> Edit</span>
      </p>
      <p
      className='font-inter text-sm orange_gradient ' 
      onClick={handleDelete}
      >
        <span className='cursor-pointer'> Delete </span>
      </p>
    </div>
   )}
    </div>
  )
}

export default PromptCard