import { StatusBar } from "expo-status-bar";
import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { useFonts, Inter_700Bold } from "@expo-google-fonts/inter";
import { Dimensions } from "react-native";
import { Link } from "expo-router";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import BackButton from "../components/BackButton";

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
          <BackButton />
          <Text
            style={{ fontFamily: "Inter_700Bold", fontSize: 40 }}
            className="font-bold mt-4"
          >
            Trends
          </Text>

          <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <Text>DYNAMIC</Text>
          <Text>DYNAMIC</Text>
          <Text>DYNAMIC</Text>
          <Text>DYNAMIC</Text>
          <Text>DYNAMIC</Text>
          <Text>DYNAMIC</Text>
          <Text>DYNAMIC</Text>
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </View>
  );
}
