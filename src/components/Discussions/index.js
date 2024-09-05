import React from 'react';
import { Link } from 'react-router-dom';
import { TbClockHour4 } from "react-icons/tb";
import { FaComments, FaTag } from "react-icons/fa";
import { useAuth } from '../../AuthContext';
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// Données brutes d'exemple
const exampleDiscussions = [
  {
    id_discussion: 1,
    category: "Électronique",
    titre: "Meilleur deal PS5 du moment",
    content: "J'ai trouvé une PS5 à un prix incroyable. Quelqu'un d'autre a vu cette offre ?",
    id_utilisateur: "GamerPro",
    timeAgo: "2 heures",
    comments: 15,
    likes: 32
  },
  {
    id_discussion: 2,
    category: "Voyage",
    titre: "Bon plan vol Paris-Tokyo",
    content: "Une compagnie propose des vols à -50% pour Tokyo. Qui est partant ?",
    id_utilisateur: "GlobeTrotter",
    timeAgo: "5 heures",
    comments: 28,
    likes: 45
  },
  {
    id_discussion: 3,
    category: "Mode",
    titre: "Promo sur les sneakers",
    content: "J'ai repéré une promo intéressante sur des sneakers de marque. Ça intéresse quelqu'un ?",
    id_utilisateur: "FashionLover",
    timeAgo: "1 jour",
    comments: 7,
    likes: 19
  },
  {
    id_discussion: 4,
    category: "Alimentation",
    titre: "Réduction sur les produits bio",
    content: "Un nouveau magasin bio propose 30% de réduction sur tout le magasin cette semaine !",
    id_utilisateur: "HealthyEater",
    timeAgo: "3 jours",
    comments: 22,
    likes: 38
  }
];

function Discussions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  return (
    <Box bg="gray.50" minH="100vh" p={4}>
      <Box maxW="4xl" mx="auto">
        <Box mb={4}>
          <Button onClick={onOpen} colorScheme="blue">
            Ajouter une discussion
          </Button>
        </Box>

        {!user && (
          <Box textAlign="center" color="gray.600" fontSize="2xl" mb={12}>
            Vous devez vous connecter pour ajouter une discussion.
          </Box>
        )}

        <Box>
          {exampleDiscussions.map((discussion) => (
            <Link to={`/discussions/${discussion.id_discussion}`} key={discussion.id_discussion}>
              <Box 
                bg="white" 
                m={4} 
                p={4} 
                rounded="lg" 
                shadow="md" 
                _hover={{ shadow: "lg" }}
                transition="all 0.3s"
              >
                <Box fontSize="lg" fontWeight="semibold" color="blue.600">{discussion.category}</Box>
                <Box fontSize="xl" fontWeight="semibold" mt={2} color="gray.800">{discussion.titre}</Box>
                {discussion.content && (
                  <Box mt={2} fontSize="sm" color="gray.700" noOfLines={2}>{discussion.content}</Box>
                )}
                <Flex justify="space-between" align="center" mt={4} color="gray.500" fontSize="sm">
                  <Box>{discussion.id_utilisateur}</Box>
                  <Box display="flex" alignItems="center"><TbClockHour4 className="mr-1" /> il y a {discussion.timeAgo}</Box>
                </Flex>
                <Flex align="center" mt={2} justify="space-between">
                  <Flex align="center">
                    <Box color="gray.600" mr={4} display="flex" alignItems="center">
                      <FaComments className="mr-2" /> {discussion.comments}
                    </Box>
                    <Box color="gray.600" display="flex" alignItems="center">
                      <FaTag className="mr-2" /> {discussion.likes}
                    </Box>
                  </Flex>
                  <Button colorScheme="blue" variant="link">Commenter</Button>
                </Flex>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>

      {/* Ici, vous pouvez ajouter le Modal pour créer une nouvelle discussion si nécessaire */}
    </Box>
  );
}

export default Discussions;
