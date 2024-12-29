import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Camera, useCameraDevices, PhotoFile } from 'react-native-vision-camera';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [photoUri, setPhotoUri] = useState(null);
  
  // Get the camera devices
  const devices = useCameraDevices();
  const device = cameraPosition === 'back' ? devices.back : devices.front;
  
  // Request camera permission
  useEffect(() => {
    const getPermission = async () => {
      const permission = await request(PERMISSIONS.IOS.CAMERA);
      if (permission === RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    };

    getPermission();
  }, []);

  // Handle camera position toggle
  const toggleCamera = () => {
    setCameraPosition(cameraPosition === 'back' ? 'front' : 'back');
  };

  // Take a photo
  const takePhoto = async () => {
    if (device) {
      const photo = await device.takePhoto();
      setPhotoUri(photo.uri);
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true} />
      
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleCamera} style={styles.button}>
          <Text style={styles.buttonText}>Switch Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        
        {/* Display the photo if taken */}
        {photoUri && (
          <View style={styles.photoContainer}>
            <Text style={styles.buttonText}>Photo Taken!</Text>
            <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  photoContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    alignItems: 'center',
  },
  photoPreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default CameraScreen;
