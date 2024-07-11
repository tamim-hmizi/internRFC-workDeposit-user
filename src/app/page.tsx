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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";

const initValues = { Thème: "", Date: "", Avancement: "", Tâche: "", Fichier:"" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Home() {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();
  const [file, setFile] = useState<File>();

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

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

  const onSubmit = async () => {
    setIsDialogOpen(true);
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const onModify = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container maxW="450px" mt={12}>
      <Center>
        <Heading color="teal.400" mb={10}>
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

      <FormControl isRequired isInvalid={touched.Date && !values.Date} mb={5}>
        <FormLabel color="teal.600">Date</FormLabel>
        <Input
          type="date"
          name="Date"
          errorBorderColor="red.300"
          value={values.Date}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage><strong>Champs requis</strong></FormErrorMessage>
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
      value={values.Fichier}
      onChange={(e) => {
        setFile(e.target.files?.[0]);
      }}
      style={{ flex: 1 }}
    />
    <Button
      colorScheme='teal'
      variant='ghost'
      onClick={() => {
      
      }}
      ml={2} 
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

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Rapport de travail
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text><strong>Thème:</strong> {values.Thème}</Text>
              <Text><strong>Date:</strong> {values.Date}</Text>
              <Text><strong>Avancement:</strong> {values.Avancement}%</Text>
              <Text><strong>Tâche:</strong> {values.Tâche}</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onModify} colorScheme="red">
                Modifier
              </Button>
              <Button colorScheme="blue" ml={3}>
                Valider
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
