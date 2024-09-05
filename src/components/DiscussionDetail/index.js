import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TbClockHour4 } from "react-icons/tb";
import { FaComments, FaTag, FaArrowLeft, FaThumbsUp, FaShareAlt } from "react-icons/fa";
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

// Données d'exemple pour les discussions
const exampleDiscussions = [
  {
    id_discussion: 1,
    category: "Électronique",
    titre: "Meilleur deal PS5 du moment",
    content: "J'ai trouvé une PS5 à un prix incroyable. Quelqu'un d'autre a vu cette offre ? Elle est disponible chez [nom du magasin] jusqu'à la fin de la semaine. Le pack comprend la console, une manette supplémentaire et le jeu Spider-Man Miles Morales.",
    id_utilisateur: "GamerPro",
    timeAgo: "2 heures",
    comments: 15,
    likes: 32
  },
  // ... ajoutez ici les autres discussions d'exemple
];

// Données d'exemple pour les commentaires
const exampleComments = [
  { id: 1, user: "UserA", content: "Super bon plan, merci !", timeAgo: "1 heure" },
  { id: 2, user: "UserB", content: "J'ai testé, c'est vraiment intéressant.", timeAgo: "30 minutes" },
  { id: 3, user: "UserC", content: "Quelqu'un a plus d'infos sur la durée de l'offre ?", timeAgo: "15 minutes" },
];

function DiscussionDetail() {
  const { id } = useParams();
  const discussion = exampleDiscussions.find(d => d.id_discussion === parseInt(id));

  if (!discussion) {
    return <Box p={4}>Discussion non trouvée.</Box>;
  }

  return (
    <Box bg="gray.50" minH="100vh" p={4}>
      <Box maxW="4xl" mx="auto">
        <Link to="/discussions">
          <Button leftIcon={<FaArrowLeft />} mb={4}>
            Retour aux discussions
          </Button>
        </Link>
        
        <Box bg="white" p={6} rounded="lg" shadow="md">
          <Text fontSize="sm" color="blue.600" fontWeight="bold">{discussion.category}</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>{discussion.titre}</Text>
          <Flex justify="space-between" align="center" mt={2} color="gray.500" fontSize="sm">
            <Text>{discussion.id_utilisateur}</Text>
            <Flex align="center"><TbClockHour4 /> <Text ml={1}>il y a {discussion.timeAgo}</Text></Flex>
          </Flex>
          <Text mt={4}>{discussion.content}</Text>
          <Flex mt={4} justify="space-between" align="center">
            <Flex align="center">
              <Box mr={4} display="flex" alignItems="center">
                <FaComments /> <Text ml={2}>{discussion.comments}</Text>
              </Box>
              <Box display="flex" alignItems="center">
                <FaTag /> <Text ml={2}>{discussion.likes}</Text>
              </Box>
            </Flex>
            <Flex>
              <Button leftIcon={<FaThumbsUp />} colorScheme="blue" mr={2}>Like</Button>
              <Button leftIcon={<FaShareAlt />}>Partager</Button>
            </Flex>
          </Flex>
        </Box>

        <VStack spacing={4} mt={8} align="stretch">
          <Text fontSize="xl" fontWeight="bold">Commentaires</Text>
          {exampleComments.map((comment) => (
            <Box key={comment.id} bg="white" p={4} rounded="md" shadow="sm">
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold">{comment.user}</Text>
                <Text fontSize="sm" color="gray.500">il y a {comment.timeAgo}</Text>
              </Flex>
              <Text>{comment.content}</Text>
            </Box>
          ))}
        </VStack>

        <Box mt={8}>
          <Button colorScheme="blue" width="full">Ajouter un commentaire</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default DiscussionDetail;