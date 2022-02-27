/* eslint-disable no-irregular-whitespace */
import { useEffect, useState } from "react";
import { Badge, Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { getPosts, updatePost } from "../firebase";
import { getDistance } from "../utils/geoLocation";
import React from "react";

export default function PostsList({ location }) {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [posts, setPosts] = useState([]);

  const addToast = (post) => {
    toastIdRef.current = toast({
      title: post.title,
      description: post.body,
      position: "top-right",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  };

  // Fetch and subscribe to posts
  useEffect(() => {
    getPosts((data) => {
      setPosts(data);

      // Fetch tags and viewed posts from local and session storage
      const saved = localStorage.getItem("tags");
      const viewedPosts =
        JSON.parse(sessionStorage.getItem("viewedPosts")) || [];
      const selectedFilters = Object.values(JSON.parse(saved))
        .filter((tag) => tag.checked == true)
        .map((filter) => filter.name);

      // Determine diff between new posts and viewed posts
      const newPosts = data.filter(
        ({ id: id1 }) => !viewedPosts.some(({ id: id2 }) => id2 === id1)
      );

      // Filter the posts by tags that the user wants to be notified for
      const newPostsToNotify = newPosts.filter((post) =>
        post.tags.some((tag) => selectedFilters.includes(tag))
      );

      // Create a toast for each post that should create a notification
      newPostsToNotify.map((post) => addToast(post));

      // Combine previously viewed and new posts to notify into an array
      // Persist combined array to session storage
      sessionStorage.setItem(
        "viewedPosts",
        JSON.stringify([...newPostsToNotify, ...viewedPosts])
      );
    });
  }, []);

  const distance = (postCoords) => {
    return getDistance(
      { lat: postCoords.lat, lon: postCoords.lon },
      { lat: location.latitude, lon: location.longitude }
    ).toFixed(2);
  };

  const upvotePost = (id, upvoteCount) => {
    upvoteCount += 1;
    updatePost(id, upvoteCount);
  };

  const listItems = posts
    .filter((post) => distance(post.coords) < 100)
    .sort((a, b) => {
      return distance(a.coords) - distance(b.coords);
    })
    .map((post) => {
      return (
        <Box p="10px" key={post.id} mt={4} boxShadow="lg" color="darkGreen">
          <Heading as="h3" size="md" color="darkGreen">{post.title}</Heading>
          <Text>{post.body}</Text>
          <p>
            <FontAwesomeIcon icon={faLocationDot} />　{distance(post.coords)}m
          </p>
          <p>
            <FontAwesomeIcon
              icon={faThumbsUp}
              onClick={() => upvotePost(post.id, post.upvoteCount)}
            />
            　{post.upvoteCount} votes
          </p>
          <Flex columnGap="4px" direction="row" flexWrap="wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} bg="darkGreen" color="white" textTransform="capitalize">{tag}</Badge>
            ))}
          </Flex>
        </Box>
      );
    });
  return listItems;
}
