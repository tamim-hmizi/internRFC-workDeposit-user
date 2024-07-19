
import React from 'react';
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

const AlertDialogSuppression = ({ isOpen, onClose, onConfirmDelete }) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Confirmation de suppression</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Êtes-vous sûr de vouloir supprimer ce rapport ?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onClose}>Annuler</Button>
          <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogSuppression;
