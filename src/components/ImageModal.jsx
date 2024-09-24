import { 
    Image,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
} from '@chakra-ui/react'

function ImageModal({ artPiece, onClose }) {

  return (
    <Modal isOpen={artPiece} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{artPiece?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={artPiece?.primaryImage} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ImageModal
