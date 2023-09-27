'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList =({data, handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
    {data.map((post)=>{
      return(
        <PromptCard key={post._id} handleTagClick={handleTagClick} post={post}/>
      )
    })}
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [posts,setPosts] = useState([])
  const [searchedResults, setSearchedResults]= useState([])

const filterPrompts =(searchText)=>{
  const regex = new RegExp(searchText, 'i')
  return posts.filter((item)=>
    regex.test(item.creator.username)  ||
    regex.test(item.prompt) || 
    regex.test(item.tag)
  )
}
const handleTagClick=(tagName)=>{
      setSearchText(tagName)
      const filteredResults = filterPrompts(tagName)
      console.log(filteredResults)
      setSearchedResults(filteredResults)
}
    const handleSearchChange =(e)=>{
      clearTimeout(searchTimeout)
        setSearchText(e.target.value)
        setSearchTimeout(
          setTimeout(()=>{
            const filteredResults = filterPrompts(e.target.value)
            setSearchedResults(filteredResults)
          },400)
        ) }


  useEffect( ()=>{
    const fetchPosts = async()=>{
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
     fetchPosts()

  },[])


  
  return (
    <section className='feed'>
      <form
    className='relative w-full flex-center'>
      <input 
      type="text" 
      placeholder='Search for a tag/username' 
      value={searchText}
      onChange={handleSearchChange}
      required
      className='search_input peer' />
      </form>

     {searchText.length>0 ? (
      <PromptCardList
      data={searchedResults}
      handleTagClick={handleTagClick}
      />
     ) : (
      <PromptCardList
      data={posts}
      handleTagClick={handleTagClick}
      />
     )}
    </section>
  )
}

export default Feed
