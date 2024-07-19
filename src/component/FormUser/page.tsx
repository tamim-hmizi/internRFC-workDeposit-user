"use client";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  Text,
  Textarea,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import RapportDialog from "@/component/DataDialog/page";
import FileUpload from "../pages/api/upload"; // Assuming this is correctly implemented

const initValues = { Thème: "", Date: "", Avancement: "", Tâche: "", Fichier: "" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Formulaire() {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dateError, setDateError] = useState(""); // State for date error message
  const cancelRef = useRef();
  const [file, setFile] = useState<File>();

  const { values, isLoading, error } = state;

  const onBlur = async ({ target }) => {
    setTouched((prev) => ({ ...prev, [target.name]: true }));

    // Vérifiez la date si le champ de date est flouté
    if (target.name === "Date") {
      try {
        const response = await fetch('/api/rapport', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Date: target.value }),
        });
        const data = await response.json();
        if (data.exists) {
          setDateError("Un rapport avec la même date existe déjà.");
        } else {
          setDateError("");
        }
      } catch (error) {
        console.error('Error checking date:', error);
      }
    }
  };

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const handleNumberChange = (value) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        Avancement: value,
      },
    }));

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        Fichier: selectedFile ? selectedFile.name : "",
      },
    }));
  };

  const onSubmit = async () => {
    setIsDialogOpen(true);
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const onModify = () => {
    setIsDialogOpen(false);
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data.fileUrl);
        setState((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            Fichier: data.fileUrl,
          },
        }));
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Container maxW="450px" mt={12}>
      <Center>
        <Heading color="teal.700" mb={10}>
          Rapport de travail
        </Heading>
      </Center>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl isRequired isInvalid={touched.Thème && !values.Thème} mb={5}>
        <FormLabel color="teal.600">Thème</FormLabel>
        <Input
          type="text"
          name="Thème"
          errorBorderColor="red.300"
          value={values.Thème}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage><strong>Champs requis</strong></FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={(touched.Date && !values.Date) || dateError} mb={5}>
        <FormLabel color="teal.600">Date</FormLabel>
        <Input
          type="date"
          name="Date"
          errorBorderColor="red.300"
          value={values.Date}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage><strong>{dateError || "Champs requis"}</strong></FormErrorMessage>
      </FormControl>

      <FormControl
        mb={5}
        isRequired
        isInvalid={touched.Avancement && !values.Avancement}
      >
        <FormLabel color="teal.600">Avancement</FormLabel>
        <NumberInput
          max={100}
          min={0}
          name="Avancement"
          value={values.Avancement}
          onChange={handleNumberChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage><strong>Champs requis</strong></FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={touched.Tâche && !values.Tâche} mb={5}>
        <FormLabel color="teal.600">Tâches</FormLabel>
        <Textarea
          type="text"
          name="Tâche"
          rows={4}
          errorBorderColor="red.300"
          value={values.Tâche}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage><strong>Champs requis</strong></FormErrorMessage>
      </FormControl>

      <FormControl mb={7}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <FormLabel color="teal.600">Fichier</FormLabel>
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="Info"
          icon={<InfoIcon />}
          ml={0.4}
          size="sm"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Ce champ n'est pas obligatoire.</PopoverBody>
      </PopoverContent>
    </Popover>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Input
      type="file"
      name="Fichier"
      onChange={handleFileChange}
      style={{ flex: 1 }}
    />
    <Button
      colorScheme='teal'
      variant='ghost'
      ml={2}
      onClick={handleFileUpload} // Pass handleFileUpload directly here
    >
      Ajouter
    </Button>
  </div>
</FormControl>

      <Center mt={4}>
        <Button
          variant="outline"
          colorScheme="blue"
          isLoading={isLoading}
          disabled={
            !values.Thème || !values.Date || !values.Avancement || !values.Tâche
          }
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Center>

      <RapportDialog
        isOpen={isDialogOpen}
        onClose={onCloseDialog}
        values={values}
        onModify={onModify}
      />
    </Container>
  );
}
