import { ForeignExpectation2D } from "@/types";

import { Dispatch, FormEvent, SetStateAction, useCallback } from "react";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

type FormProps = {
  setForeignExpectations: Dispatch<SetStateAction<ForeignExpectation2D[]>>;
};

export default function Form({ setForeignExpectations }: FormProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onClose();

      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/addForeignExpectations", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      // Handle response if necessary
      const data = await response.json();
      setForeignExpectations(data);
    },
    [onClose, setForeignExpectations]
  );

  return (
    <>
      <Button
        className="absolute flex flex-col bg-white top-0"
        onPress={onOpen}
      >
        Add foreign Expectation
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Add foreign Expectation</ModalHeader>
            <ModalBody>
              <Input type="text" name="expectation" label="expectation" />
              <Input type="text" name="experience" label="experience" />
            </ModalBody>
            <ModalFooter>
              <Button type="submit">send</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
