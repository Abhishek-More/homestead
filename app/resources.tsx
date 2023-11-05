import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

import {
  useFonts,
  Inter_700Bold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import BackButton from "../components/BackButton";
import { BarChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/AntDesign";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
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
          <ScrollView indicatorStyle="white">
            <BackButton />
            <Text
              style={{ fontFamily: "Inter_700Bold", fontSize: 40 }}
              className="font-bold mt-8"
            >
              Resources
            </Text>
            <Text
              style={{ fontFamily: "Inter_400Regular", fontSize: 20 }}
              className="font-medium font-gray-800 mt-2 mb-6"
            >
              Easily accessible resources to make your home buying process
              easier!
            </Text>

            <Link href="https://www.nerdwallet.com/article/finance/raise-credit-score-fast">
              <View className="flex flex-col gap-2">
                <Image
                  source={{
                    uri: "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2019/08/GettyImages-1283906038-2400x1440.jpg",
                  }}
                  style={{
                    width: Dimensions.get("window").width - 48,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <View className="">
                  <Text className="text-xl font-medium">
                    How does credit score work?
                  </Text>
                  <Text className="text-md font-medium">
                    NerdWallet - 9 minute read
                  </Text>
                </View>
              </View>
            </Link>

            <View className="my-6 h-[2px] bg-black opacity-10"></View>

            <Link href="https://www.investopedia.com/terms/l/loantovalue.asp">
              <View className="flex flex-col gap-2">
                <Image
                  source={{
                    uri: "https://www.investopedia.com/thmb/IlGpDBwmhDhrAXQywfBYEIPrjcY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/terms_l_loantovalue_FINAL-9676cca1d30f478a9a875a8f60f94ba8.jpg",
                  }}
                  style={{
                    width: Dimensions.get("window").width - 48,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <View className="">
                  <Text className="text-xl font-medium">
                    Learn more about Loan-to-Value
                  </Text>
                  <Text className="text-md font-medium">
                    Investopedia - 16 minute read
                  </Text>
                </View>
              </View>
            </Link>

            <View className="my-6 h-[2px] bg-black opacity-10"></View>

            <Link href="https://www.cnbc.com/select/how-to-calculate-debt-to-income-ratio-for-mortgage/">
              <View className="flex flex-col gap-2">
                <Image
                  source={{
                    uri: "https://image.cnbcfm.com/api/v1/image/107090227-1658160917191-gettyimages-1289535724-091a0017.jpeg?v=1672598389&w=740&h=416&ffmt=webp&vtcrop=y",
                  }}
                  style={{
                    width: Dimensions.get("window").width - 48,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <View className="">
                  <Text className="text-xl font-medium">
                    Calculate Debt-to-Income
                  </Text>
                  <Text className="text-md font-medium">
                    CNBC - 6 minute read
                  </Text>
                </View>
              </View>
            </Link>

            <View className="my-6 h-[2px] bg-black opacity-10"></View>

            <Link href="https://www.rocketmortgage.com/learn/how-to-get-a-mortgage">
              <View className="flex flex-col gap-2">
                <Image
                  source={{
                    uri: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/New%20Images/Stock-FamilyMovingInHome-AdobeStock-236073349-copy.jpeg",
                  }}
                  style={{
                    width: Dimensions.get("window").width - 48,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <View className="">
                  <Text className="text-xl font-medium">
                    How to get a mortgage
                  </Text>
                  <Text className="text-md font-medium">
                    RocketMortgage - 8 minute read
                  </Text>
                </View>
              </View>
            </Link>

            <View className="my-8 h-[2px]"></View>
          </ScrollView>
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </View>
  );
}
