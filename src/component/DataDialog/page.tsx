"use client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import SuccessDialog from '@/component/SuccessDialog/page'

export default function RapportDialog({
  isOpen: parentIsOpen, 
  onClose: parentOnClose, 
  values,
  onModify,
}) {
  const cancelRef = useRef();
  const [showSuccess, setShowSuccess] = useState(false);

  const submitRapport = async () => {
    try {
      const response = await fetch('/api/rapport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Rapport added:', data);

      // Close the current dialog and show the success message
      parentOnClose();
      setShowSuccess(true);

      // Redirect after showing the success message for 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = '/BilanRapport';
      }, 3000);
    } catch (error) {
      console.error('Error adding rapport:', error);
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={parentIsOpen} 
        leastDestructiveRef={cancelRef}
        onClose={parentOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Rapport de travail
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>
                <strong>Thème:</strong> {values.Thème}
              </Text>
              <Text>
                <strong>Date:</strong> {values.Date}
              </Text>
              <Text>
                <strong>Avancement:</strong> {values.Avancement}%
              </Text>
              <Text>
                <strong>Tâche:</strong> {values.Tâche}
              </Text>
              {values.Fichier && (
                <Text>
                  <strong>Fichier:</strong>{" "}
                  <a href={values.Fichier} target="_blank" rel="noopener noreferrer">
                    Voir fichier
                  </a>
                </Text>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onModify} colorScheme="red">
                Modifier
              </Button>
              <Button colorScheme="blue" ml={3} onClick={submitRapport}>
                Valider
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Success message dialog */}
      {showSuccess && (
        <SuccessDialog
          isOpen={showSuccess}
          leastDestructiveRef={cancelRef}
          onClose={() => setShowSuccess(false)}
        /> 
      )}
    </>
  );
}
