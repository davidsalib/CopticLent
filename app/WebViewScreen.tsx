import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { View, Alert, Linking } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook

// Define the type for the params (with url and title)
type WebViewScreenParams = {
  url: string;
  title: string;
};

export default function WebViewScreen() {
  // Access parameters (url and title)
  const { url, title } = useLocalSearchParams<WebViewScreenParams>(); // Using the correct type

  const [isConnected, setIsConnected] = useState(true);
  const router = useRouter();
  const navigation = useNavigation(); // Get the navigation instance

  useEffect(() => {
    // Set the title dynamically based on the 'title' passed in the params
    if (title) {
      navigation.setOptions({ title }); // Update title using setOptions
    }

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, [title, navigation]);

  useEffect(() => {
    if (!isConnected) {
      Alert.alert("No Internet", "Please connect to the internet first.", [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)/Books"),
        },
      ]);
    }
  }, [isConnected, router]);

  if (!url) {
    useEffect(() => {
      Alert.alert("Invalid URL", "The URL provided is invalid.", [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)/Books"),
        },
      ]);
    }, [router]);
    return null;
  }

  // Handle the WebView navigation (links inside the WebView)
  const handleNavigationStateChange = (navState: any) => {
    const { url: newUrl } = navState;
    // Check if the URL starts with http:// (not secure), open it in the browser
    if (!newUrl.startsWith("https://")) {
      Linking.openURL(newUrl).catch((err) => {
        console.error("Failed to open URL:", err);
        Alert.alert("Error", "Failed to open the URL in the browser.");
      });
    }
  };

  // Check if the URL is secure, otherwise open in browser
  if (!url.startsWith("https://")) {
    useEffect(() => {
      Linking.openURL(url).catch((err) => {
        console.error("Failed to open URL:", err);
        Alert.alert("Error", "Failed to open the URL in the browser.");
      });
    }, [url]);
    return null; // Return null to stop rendering the WebView
  }

  if (!isConnected) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Render WebView with the passed URL */}
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange} // Handle link clicks inside WebView
      />
    </View>
  );
}
