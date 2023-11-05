import { StatusBar } from "expo-status-bar";
import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { useFonts, Inter_700Bold } from "@expo-google-fonts/inter";
import { Link } from "expo-router";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  function runner() {
    console.log("HI");
  }

  return (
    <View className="h-screen">
      <SafeAreaProvider>
        <SafeAreaView className="h-full mx-4">
          <Text
            style={{ fontFamily: "Inter_700Bold", fontSize: 40 }}
            className="font-bold mt-8"
          >
            Trends
          </Text>
          <View className="absolute bottom-32 w-full">
            <Link
              className="mt-12 py-4 px-3 border-2 mx-8 border-[#6C63FF] rounded-md bg-white"
              href="/static"
            ></Link>
            <Pressable
              className="mt-12 py-4 px-3 border-2 mx-8 border-[#6C63FF] rounded-md bg-white"
              onPress={runner}
            >
              <Text className="text-center text-black">
                View Prebuilt Analytics
              </Text>
            </Pressable>
            <Pressable
              className="py-4 px-3 border mx-8 mt-4 border-[#6C63FF] rounded-md bg-[#6C63FF]"
              onPress={runner}
            >
              <Text className="text-white text-center">Enter Metrics</Text>
            </Pressable>
          </View>
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </View>
  );
}
