import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, SafeAreaView } from 'react-native';

const WebViewScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: url }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;