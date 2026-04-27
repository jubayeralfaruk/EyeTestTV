import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useTVEventHandler,
} from 'react-native';

export default function FullImageScreen({route, navigation}) {
  const {images, currentIndex} = route.params;
  const [index, setIndex] = useState(currentIndex);

  useTVEventHandler(event => {
    if (event.eventType === 'right') {
      setIndex(prev => Math.min(prev + 1, images.length - 1));
    } else if (event.eventType === 'left') {
      setIndex(prev => Math.max(prev - 1, 0));
    } else if (event.eventType === 'back') {
      navigation.goBack();
    }
  });

  return (
    <View style={styles.container}>
      <Image
        source={images[index]}
        style={styles.fullImage}
        resizeMode="contain"
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity
          isTVSelectable={true}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.counter}>
          {index + 1} / {images.length}
        </Text>
        <View style={styles.navButtons}>
          <TouchableOpacity
            isTVSelectable={true}
            style={styles.navBtn}
            onPress={() => setIndex(prev => Math.max(prev - 1, 0))}>
            <Text style={styles.navText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            isTVSelectable={true}
            style={styles.navBtn}
            onPress={() =>
              setIndex(prev => Math.min(prev + 1, images.length - 1))
            }>
            <Text style={styles.navText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '88%',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: 10,
  },
  backBtn: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  navBtn: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
