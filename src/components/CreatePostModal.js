import { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { addPost } from "../firebase";
import React from "react";
import { TAGS } from "../constants";

const defaultTags = TAGS;
Object.entries(TAGS).forEach(entry => {
  defaultTags[entry[0]].checked = false;
})

export default function CreatePostModal({ location, isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [tags, setTags] = useState(defaultTags);

  const handleClick = () => {
    const selectedTags = Object.values(tags).filter(tag => tag.checked).map(tag => tag.name);
    addPost(title, description, time, selectedTags, {
      lat: location.latitude,
      lon: location.longitude,
    });
    onClose();
  };

  const handleTime = (e) => {
    var timeOut = new Date();
    timeOut.setSeconds(timeOut.getSeconds() + e.target.value * 60 * 60);
    setTime(timeOut.getTime());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="darkGreen"><Text as="h1" size="lg" color="white">Leave an acorn</Text></ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Title`}
            focusBorderColor="carrot"
          />
          <Textarea
            mt="8px"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`What's Happening?`}
            focusBorderColor="carrot"
          />
          <Select mt="8px" placeholder="Choose expiry time" onChange={(e) => handleTime(e)}>
            <option value={1}>1 Hour</option>
            <option value={4}>4 Hours</option>
            <option value={12}>12 Hours</option>
            <option value={24}>1 Day</option>
            <option value={168}>1 Week</option>
          </Select>
          <Flex  mt="8px" columnGap={4} rowGap={2} direction='row' flexWrap="wrap">
            {Object.entries(tags).map(entry => {
              const [name, value] = entry;
              return (
                <Checkbox
                colorScheme="green"
                  key={name}
                  isChecked={tags[name].checked}
                  onChange={() => {
                    setTags({
                      ...tags,
                      [name]: {
                        ...tags[name],
                        checked: !tags[name].checked
                      }
                    })
                  }}
                >
                  {value.name}
                </Checkbox>
              )
            })}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr="16px" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleClick}>
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
