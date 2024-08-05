import React, { useState, useEffect } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
  SimpleGrid,
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ArrowForwardIcon, AddIcon, DeleteIcon, RepeatClockIcon } from '@chakra-ui/icons';
import AlertDialogSuppression from '@/component/AlertDialogSuppression/page';
import Link from 'next/link';

export default function BilanRapportPage() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editReport, setEditReport] = useState(null);
  const [editTheme, setEditTheme] = useState('');
  const [editAvancement, setEditAvancement] = useState('');
  const [editTache, setEditTache] = useState('');

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch('/api/rapport');
        const data = await response.json();
        console.log('Fetched reports:', data);
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  const handleDateClick = (report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedReport(null);
    setIsDialogOpen(false);
  };

  const handleDeleteClick = (report) => {
    setReportToDelete(report);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setReportToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/rapport/${reportToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedReports = reports.filter((report) => report.id !== reportToDelete.id);
        setReports(updatedReports);
      } else {
        console.error('Failed to delete report:', response.status);
      }
    } catch (error) {
      console.error('Error deleting report:', error);
    } finally {
      setIsDeleteDialogOpen(false);
      setReportToDelete(null);
    }
  };

  const handleEditClick = (report) => {
    setEditReport(report);
    setEditTheme(report.Theme);
    setEditAvancement(report.Avancement);
    setEditTache(report.Tâche);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditReport(null);
    setEditTheme('');
    setEditAvancement('');
    setEditTache('');
    setIsEditDialogOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`/api/rapport/${editReport.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Theme: editTheme,
          Avancement: editAvancement,
          Tâche: editTache,
        }),
      });

      if (response.ok) {
        const updatedReports = reports.map((report) =>
          report.id === editReport.id
            ? {
                ...report,
                Theme: editTheme,
                Avancement: editAvancement,
                Tâche: editTache,
              }
            : report
        );
        setReports(updatedReports);
        setIsEditDialogOpen(false);
      } else {
        console.error('Failed to update report:', response.status);
      }
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const handleDragStart = (e, report) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(report));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropDelete = (e) => {
    e.preventDefault();
    const droppedReport = JSON.parse(e.dataTransfer.getData('text/plain'));
    handleDeleteClick(droppedReport);
  };

  const handleDropEdit = (e) => {
    e.preventDefault();
    const droppedReport = JSON.parse(e.dataTransfer.getData('text/plain'));
    handleEditClick(droppedReport);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box width="100%" maxWidth="1200px">
        <Flex justifyContent="space-between" mb={4}>
          <Flex>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              variant="solid"
              mr={2}
              onDragOver={handleDragOver}
              onDrop={handleDropDelete}
            >
              Supprimer
            </Button>
            <Button
              leftIcon={<RepeatClockIcon />}
              colorScheme="yellow"
              variant="solid"
              onDragOver={handleDragOver}
              onDrop={handleDropEdit}
            >
              Modifier
            </Button>
            <p style={{ fontSize: '0.875em', color: 'gray' }}>Drag and Drop la date que tu veux supprimer ou modifier</p>
          </Flex>
          <Link href="/FormUser">
            <Button leftIcon={<AddIcon />} colorScheme="green" variant="solid">
              Ajouter
            </Button>
          </Link>
        </Flex>
        {isLoading ? (
          <Flex justifyContent="center">
            <Button isLoading loadingText="Loading" colorScheme="teal" variant="outline">
              Loading
            </Button>
          </Flex>
        ) : (
          <SimpleGrid marginLeft={{ base: 4, md: 0 }} columns={5} spacing={4}>
            {reports.map((report) => (
              <Button
                key={report.id}
                onClick={() => handleDateClick(report)}
                onDragStart={(e) => handleDragStart(e, report)}
                draggable
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="outline"
              >
                {report.Date}
              </Button>
            ))}
          </SimpleGrid>
        )}

        <AlertDialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogCloseButton />
            <AlertDialogHeader>Détails du Rapport</AlertDialogHeader>
            <AlertDialogBody>
              <Text>
                <strong>Thème :</strong> {selectedReport?.Theme}
              </Text>
              <Text>
                <strong>Date :</strong> {selectedReport?.Date}
              </Text>
              <Text>
                <strong>Avancement :</strong> {selectedReport?.Avancement}%
              </Text>
              <Text>
                <strong>Tâche :</strong> {selectedReport?.Tâche}
              </Text>
              {selectedReport?.File && (
                <Text>
                  <strong>Fichier :</strong>{' '}
                  <a href={selectedReport.File} target="_blank" rel="noopener noreferrer">
                    Voir fichier
                  </a>
                </Text>
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCloseDialog}>Fermer</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          motionPreset="slideInBottom"
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Modifier le Rapport</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <FormControl mb={4}>
                <FormLabel>Thème</FormLabel>
                <Input
                  value={editTheme}
                  onChange={(e) => setEditTheme(e.target.value)}
                  placeholder="Entrez le thème"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Avancement (%)</FormLabel>
                <Input
                  value={editAvancement}
                  onChange={(e) => setEditAvancement(e.target.value)}
                  type="number"
                  placeholder="Entrez l'avancement"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Tâche</FormLabel>
                <Input
                  value={editTache}
                  onChange={(e) => setEditTache(e.target.value)}
                  placeholder="Entrez la tâche"
                />
              </FormControl>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
                Enregistrer
              </Button>
              <Button onClick={handleCloseEditDialog}>Annuler</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialogSuppression
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirmDelete={handleConfirmDelete}
        />
      </Box>
    </Box>
  );
}
