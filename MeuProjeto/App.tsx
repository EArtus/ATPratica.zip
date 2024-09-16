import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, Image, Modal, Button } from "react-native";
import games from "./data/games"; 

interface Game {
  id: number;
  name: string;
  platform: string;
  genre: string;
  releaseDate: string;
  rating: string;
  developer: string;
  ratingScore: number;
  image: string;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null); 
  const [showModal, setShowModal] = useState(false);

  const localGames: Game[] = games
    .filter((game: Game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name)); 
  const openModal = (game: Game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedGame(null);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Game App</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search for a game..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      <FlatList
        data={localGames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.gameCard}>
            <Text style={styles.gameName} onPress={() => openModal(item)}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.gameImage} />
            <Text>{item.genre} - {item.platform}</Text>
            <Text>Rating: {item.rating}</Text>
          </View>
        )}
        contentContainerStyle={styles.gameListContent}
      />

      {selectedGame && (
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedGame.name}</Text>
            <Image source={{ uri: selectedGame.image }} style={styles.modalImage} />
            <Text>Platform: {selectedGame.platform}</Text>
            <Text>Genre: {selectedGame.genre}</Text>
            <Text>Developer: {selectedGame.developer}</Text>
            <Text>Release Date: {selectedGame.releaseDate}</Text>
            <Text>Rating: {selectedGame.rating} - Score: {selectedGame.ratingScore}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </Modal>
      )}

      {/* Footer fixo no final da tela */}
      <View style={styles.footer}>
        <Text>Desenvolvido por Eduardo</Text>
        <Text>Versão 1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  gameCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  gameName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  gameImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  gameListContent: {
    paddingBottom: 100, 
  },
  footer: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
