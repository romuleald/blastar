import React, {useState} from 'react';
import {Box, Flex, Button, Grid, Text} from '@chakra-ui/core';
import {CreateRoomForm} from './CreateRoomForm';

export const StartJumbotron = () => {
    const [hasRoom, setHasRoom] = useState(false);
    return (
        <Grid templateColumns="repeat(1, 1fr)" gap={0}>
            <Box
                minW="sm"
                minH="lg"
                borderWidth="0px"
                rounded="lg"
                background="white"
                overflow="hidden"
                alignSelf="center"
                justifySelf="center">
                <Box p="6" minH="lg">
                    <Flex paddingBottom="6" alignItems="center" justifyContent="center">
                        {!hasRoom ? (
                            <Text fontSize="2xl" color="black">
                                Démarrer une partie !
                            </Text>
                        ) : (
                            <Text fontSize="2xl" color="black">
                                Créer une room !
                            </Text>
                        )}
                    </Flex>
                    {hasRoom ? (
                        <Flex alignItems="center" justifyContent="center">
                            <CreateRoomForm />
                        </Flex>
                    ) : (
                        <>
                            <Flex alignItems="center" justifyContent="center" paddingBottom="6">
                                <Button variantColor="teal" minW="sm" size="lg" onClick={() => setHasRoom(true)}>
                                    Créer une room
                                </Button>
                            </Flex>
                            <Flex alignItems="center" justifyContent="center" paddingBottom="6">
                                <Button minW="sm" variantColor="teal" size="lg" marginBottom={4}>
                                    Rejoindre une room
                                </Button>
                            </Flex>
                        </>
                    )}
                </Box>
            </Box>
        </Grid>
    );
};
