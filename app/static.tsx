import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

import { useFonts, Inter_700Bold } from "@expo-google-fonts/inter";
import BackButton from "../components/BackButton";
import { BarChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/AntDesign";

export default function App() {
  const rejectionsData = {
    labels: ["DTI > 36", "Credit", "LTV", "FEDTI", "DTI > 43"],
    datasets: [
      {
        data: [16.42, 47.95, 74.5, 74.83, 77.69],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `#000000`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

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
            className="font-bold mt-8 mb-6"
          >
            Trends
          </Text>

          <View className="mt-4 flex flex-row justify-between w-full gap-2">
            <View className="flex flex-row items-center justify-between p-4 border border-black rounded-md w-6/12">
              <View>
                <Text>Accepted</Text>
                <Text className="text-[20px] flex text-black">1600 apps</Text>
              </View>
              <View className="p-2 rounded-full bg-green-500">
                <Icon name="arrowup" size={20} color="#FFF" />
              </View>
            </View>
            <View className="flex flex-row items-center justify-between p-4 border border-black rounded-md w-6/12">
              <View>
                <Text>Rejected</Text>
                <Text className="text-[20px] flex text-black">8400 apps</Text>
              </View>
              <View className="p-2 rounded-full bg-red-500">
                <Icon name="arrowdown" size={20} color="#FFF" />
              </View>
            </View>
          </View>
          <Text
            style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}
            className="font-bold my-4"
          >
            % Rejections
          </Text>

          <View className="flex justify-center w-full">
            <BarChart
              data={rejectionsData}
              width={Dimensions.get("window").width - 20}
              height={280}
              yAxisLabel=""
              yAxisSuffix="%"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero={true}
            />
          </View>
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </View>
  );
}
