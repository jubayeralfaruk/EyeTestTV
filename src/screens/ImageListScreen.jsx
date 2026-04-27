import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  useTVEventHandler,
} from 'react-native';
import {categoryImages} from '../data/images';

export default function ImageListScreen({route, navigation}) {
  const {category} = route.params;
  const images = categoryImages[category.folder] || [];
  const [focusedIndex, setFocusedIndex] = useState(0);
  const COLUMNS = 5;

  useTVEventHandler(event => {
    if (event.eventType === 'right') {
      setFocusedIndex(prev => Math.min(prev + 1, images.length - 1));
    } else if (event.eventType === 'left') {
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    } else if (event.eventType === 'down') {
      setFocusedIndex(prev => Math.min(prev + COLUMNS, images.length - 1));
    } else if (event.eventType === 'up') {
      setFocusedIndex(prev => Math.max(prev - COLUMNS, 0));
    } else if (event.eventType === 'select') {
      navigation.navigate('FullImage', {
        images,
        currentIndex: focusedIndex,
      });
    } else if (event.eventType === 'back') {
      navigation.goBack();
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>
      <FlatList
        data={images}
        numColumns={COLUMNS}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            isTVSelectable={true}
            hasTVPreferredFocus={index === 0}
            style={[
              styles.imageBox,
              focusedIndex === index && styles.focused,
            ]}
            onFocus={() => setFocusedIndex(index)}
            onPress={() =>
              navigation.navigate('FullImage', {
                images,
                currentIndex: index,
              })
            }>
            <Image source={item} style={styles.thumbnail} />
            <Text style={styles.imageNumber}>Image {index + 1}</Text>
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
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  imageBox: {
    backgroundColor: '#000000',
    margin: 8,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    flex: 1,
  },
  focused: {
    backgroundColor: '#444444',
    borderWidth: 4,
    borderColor: '#aaaaaa',
    transform: [{scale: 1.05}],
  },
  thumbnail: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  imageNumber: {
    color: '#ffffff',
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
