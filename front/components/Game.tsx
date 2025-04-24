import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { styles } from '@/styles/styles';

interface GameProps {
  game: {
    id: number;
    title: string;
    description: string;
    endDate: Date;
    startDate: Date;
  };
  onSubmitAnswer: (answer: string) => void;
}

const Game: React.FC<GameProps> = ({ game, onSubmitAnswer }) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Calculer le temps restant
  React.useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const end = new Date(game.endDate);
      const difference = end.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeRemaining(`${days}j ${hours}h ${minutes}m`);
      } else {
        setTimeRemaining('Terminé');
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 60000);

    return () => clearInterval(timer);
  }, [game.endDate]);

  const handleSubmit = () => {
    if (userAnswer.trim()) {
      onSubmitAnswer(userAnswer);
      setUserAnswer('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.gameCard}>
          <Text style={styles.gameTitle}>{game.title}</Text>
          
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Temps restant : {timeRemaining}</Text>
          </View>

          <Text style={styles.description}>{game.description}</Text>

          <TextInput
            style={styles.input}
            placeholder="Votre réponse..."
            value={userAnswer}
            onChangeText={setUserAnswer}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Soumettre ma réponse</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Game;