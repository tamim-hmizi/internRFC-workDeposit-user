import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';

interface AlertDialogSuppressionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const AlertDialogSuppression: React.FC<AlertDialogSuppressionProps> = ({ isOpen, onClose, onConfirmDelete }) => {
  const leastDestructiveRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={leastDestructiveRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Confirmation de suppression</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Êtes-vous sûr de vouloir supprimer ce rapport ?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={leastDestructiveRef} onClick={onClose}>Annuler</Button>
          <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogSuppression;
