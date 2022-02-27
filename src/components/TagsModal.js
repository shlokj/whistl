import {
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TAGS } from "../constants";

const defaultTags = TAGS;
Object.entries(TAGS).forEach((entry) => {
  defaultTags[entry[0]].checked = false;
});

export default function TagsModal({ isOpen, onClose }) {
  const [tags, setTags] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("tags");
    const initialValue = JSON.parse(saved);
    return initialValue || defaultTags;
  });

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  const handleClick = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size="full"
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader bg="darkGreen">
            <Text as="h1" size="lg" color="white">
              Select tags
            </Text>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Flex
              mt="8px"
              columnGap={4}
              rowGap={2}
              direction="row"
              flexWrap="wrap"
            >
              {Object.entries(tags).map((entry) => {
                const [name, value] = entry;
                return (
                  <Checkbox
                    key={name}
                    isChecked={tags[name].checked}
                    onChange={() => {
                      setTags({
                        ...tags,
                        [name]: {
                          ...tags[name],
                          checked: !tags[name].checked,
                        },
                      });
                    }}
                    colorScheme="green"
                  >
                    {value.name}
                  </Checkbox>
                );
              })}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleClick}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
