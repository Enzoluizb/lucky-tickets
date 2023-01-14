import { Center, Progress, VStack } from '@chakra-ui/react'
import React from 'react'
import Logo from './Logo'

function Loading() {
  return (
    <Center w="100%" h="100%"> 
        <VStack spacing="4">
            <Logo />
            <Progress w="100%" size="xs" isIndeterminate colorScheme="yellow"></Progress>
        </VStack>
    </Center>
  )
}

export default Loading