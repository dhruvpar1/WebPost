import { Box, Button, Stack, Code } from "@chakra-ui/react"
import { useAuth } from "../../hooks/auth";
import { PROTECTED, USERS } from "../../lib/routes"
import { Link } from "react-router-dom"
import Avatar from "../profile/Avatar";

function ActiveUser(){
    const {user, isLoading} = useAuth(); 
    if(isLoading) return "Loading the user..."
    return (<Stack align = "center" spacing="5" my="8">
        <Avatar user={user} />
        <Code>
        @{user?.username}
        </Code>
        <Button colorScheme="teal" w="full" as={Link} to={`${PROTECTED}/profile/${user?.id}`}>
            Edit Profile 
        </Button>
    </Stack>)
}


function Sidebar() {
  return (
    <Box
    px="6"
    height="100vh"
    w="100%"
    maxW="300px"
    borderLeft="1px solid"
    borderLeftColor="teal.100"
    position="sticky"
    top="16"
    display={{base: "none", md: "block"}}
    >   

    <ActiveUser />
     <Box align="center">
        <Box as="ul" borderBottom="2px solid" borderColor="teal.200" />


        <Button
        as={Link}
        to={USERS}
        variant="outline"
        colorScheme="teal"
        mt="4"
        size="sm"
        >
            ALL USERS
        </Button>
        </Box>
    </Box>
  )
}

export default Sidebar