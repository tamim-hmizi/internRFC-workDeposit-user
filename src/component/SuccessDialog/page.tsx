import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from "@chakra-ui/react";
  
  export default function SuccessDialog({ isOpen, leastDestructiveRef, onClose }) {
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="green.500">
              Succès !
            </AlertDialogHeader>
            <AlertDialogBody>
              Le rapport a été soumis avec succès.
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }
  