import {Box, HStack, Heading, Button, Textarea} from "@chakra-ui/react";
import { useAddPosts, usePosts } from "../../hooks/posts";
import PostList from "../posts/PostList"
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth";


function NewPost(){

  const {register, handleSubmit, reset} = useForm(); 
  const {addPost, isLoading: addingPost} = useAddPosts();
  const {user, isLoading: authLoading} = useAuth();

  function handleAddPost(data){
    addPost({
      uid: user.id,   //this is the user id of the owner not the post
      text: data.text,
    })
    console.log(data);
    reset();
  }

return(
  <Box maxW="600px" 
  mx="auto" 
  py="10">

    <form onSubmit={handleSubmit(handleAddPost)}>

      <HStack justify="space-between">
        <Heading size="lg">New Post</Heading>
        <Button colorScheme="teal" 
        type="submit" 
        isLoading={authLoading || addingPost } 
        loadingText="Loading">Post</Button> 
        {/* type="submit is used for form without this, we would 
        have problem creating register and other useForm properties" */}
      </HStack>
      
      <Textarea as={TextareaAutosize} 
        resize="none" 
        mt="5" 
        placeholder="create a new post"
        minRows={3}
      {...register("text",{required: true})}/>
    </form>
   </Box>
)
}


const Dashboard = () => {
  const {posts, isLoading: postsLoading} = usePosts() ;    
  if(postsLoading)
  return "The posts are Loading...." 


  return (
  <>
  <NewPost/>
  <PostList posts={posts}/>
  </>
    
   
  )
}

export default Dashboard