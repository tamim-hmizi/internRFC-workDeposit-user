import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { RefObject } from "react";

interface SuccessDialogProps {
  isOpen: boolean;
  leastDestructiveRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
}

export default function SuccessDialog({
  isOpen,
  leastDestructiveRef,
  onClose,
}: SuccessDialogProps) {
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
