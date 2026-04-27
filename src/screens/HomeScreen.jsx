import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useTVEventHandler,
} from 'react-native';
import {categories} from '../data/categories';

export default function HomeScreen({navigation}) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const COLUMNS = 3;

  useTVEventHandler(event => {
    if (event.eventType === 'right') {
      setFocusedIndex(prev => Math.min(prev + 1, categories.length - 1));
    } else if (event.eventType === 'left') {
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (event.eventType === 'down') {
      setFocusedIndex(prev => Math.min(prev + COLUMNS, categories.length - 1));
    } else if (event.eventType === 'up') {
      setFocusedIndex(prev => Math.max(prev - COLUMNS, 0));
    } else if (event.eventType === 'select') {
      navigation.navigate('ImageList', {
        category: categories[focusedIndex],
      });
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👁️ Eye Test App</Text>
      <FlatList
        data={categories}
        numColumns={COLUMNS}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            isTVSelectable={true}
            hasTVPreferredFocus={index === 0}
            style={[
              styles.categoryBox,
              focusedIndex === index && styles.focused,
            ]}
            onFocus={() => setFocusedIndex(index)}
            onPress={() => navigation.navigate('ImageList', {category: item})}>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#000000',
  },
  categoryBox: {
    backgroundColor: '#000000',
    margin: 10,
    padding: 20,
    flex: 1,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focused: {
    backgroundColor: '#444444',
    borderWidth: 4,
    borderColor: '#aaaaaa',
    transform: [{scale: 1.05}],
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
