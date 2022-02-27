import { useContext, useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import CreatePostModal from "../components/CreatePostModal";
import {
  Box,
  Container,
  useDisclosure,
  Heading,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import TagsModal from "../components/TagsModal";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../utils/auth";
import Navbar from "../components/Navbar";

export default function Home() {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();
  const { auth, setUser } = useContext(AuthContext);

  // Initialize geolocation tracking
  useEffect(() => {
    // Initialize geolocation tracking
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.watchPosition(
        (success) => {
          setLoading(false);
          console.log(
            `Your location is ${success.coords.latitude}, ${success.coords.longitude} (accuracy of ${success.coords.accuracy})`
          );
          setLocation(success.coords);
        },
        (error) => console.log(error)
      );
    }

    // Add listener to see if auth state changes
    onAuthStateChanged(
      auth,
      (user) => {
        console.log("Setting user");
        setUser(user);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <CreatePostModal location={location} isOpen={isOpen} onClose={onClose} />
      <TagsModal isOpen={isOpenSettings} onClose={onCloseSettings} />
      {loading ? (
        <VStack
          loading={loading}
          align="center"
          justifyContent="center"
          bg="lightGreen"
          minHeight="100vh"
        >
          <Heading color="darkGreen" fontSize="32px">
            Glad you are here!
          </Heading>
          <Spinner
            color="carrot"
            size="xl"
            emptyColor="darkGreen"
            speed="1s"
            thickness="6px"
          />
          <Heading color="darkGreen" fontSize="18px">
            Collecting Acorns...
          </Heading>
        </VStack>
      ) : (
        <>
          <Navbar createClick={onOpen} profileClick={onOpenSettings} />
          <Container padding="1em" bg="lightGreen" minHeight="100vh">
            {location && (
              <Box>
                <Heading as="h2" color="darkGreen" ml="10px">
                  Feed
                </Heading>
                <PostsList location={location} />
              </Box>
            )}
          </Container>
        </>
      )}
    </>
  );
}
