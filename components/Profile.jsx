import PromptCard from "./PromptCard"
import { PromptCardList } from "./Feed"


const Profile = ({ name, desc, handleDelete, handleEdit, data }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className='mt-16 prompt_layout'>
        {data.map((post) => {
          return (
            <PromptCard 
            key={post._id} 
            handleDelete={()=>handleDelete && handleDelete(post)} 
            handleEdit={()=>handleEdit && handleEdit(post)}
            post={post} />
          )
        })}
      </div>
    </section>
  )
}

export default Profile 