import { Box, Text } from "@chakra-ui/react"
import Header from "./Header";
import Actions from "./Actions";


function Post({ post }) {
  const { uid, text, date, likes, id } = post;
  return (
    <Box p="2" maxW="600px" textAlign="left">
      <Box border = "2px solid" borderColor="gray.100" borderRadius="md">
       <Header uid={uid} date={date}/> 
        <Box p="2" minH="100px">
          <Text wordBreak="break-word" fontSize={("sm", "md")}>
            {text}
          </Text>
           
        </Box>
        <Actions  likes={likes} id={id} uid={uid}/>
      </Box>
    </Box>
  )
}

export default Post