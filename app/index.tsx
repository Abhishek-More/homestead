import { StatusBar } from "expo-status-bar";
import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Link } from "expo-router";
import Carousel from "react-native-snap-carousel";
import { useFonts, Inter_700Bold } from "@expo-google-fonts/inter";
import { useState } from "react";

export default function App() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  let [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  function goToStatic() {
    router.replace("/static");
  }

  function goToDynamic() {
    router.replace("/dynamic");
  }

  const carousel_renderItem = ({ item, index }) => {
    return (
      <View>
        {index === 0 && (
          <View>
            <Image
              className="mt-24 h-[200px]"
              source={require("../assets/landing.png")}
            />
            <Text className="text-center w-4/5 block mx-auto font-bold">
              Introducing Homestead
            </Text>
            <Text className="text-center w-4/5 block mx-auto">
              Mortgages are complicated. Homestead streamlines the complexities
              of mortgage and PMI planning, making it easier than ever to
              navigate the world of home financing.
            </Text>
          </View>
        )}
        {index === 1 && (
          <View>
            <Image
              className="mt-24 h-[200px]"
              source={require("../assets/data.png")}
            />
            <Text className="text-center w-4/5 block mx-auto font-bold">
              Data-Driven Mortgage Assistance
            </Text>
            <Text className="text-center w-4/5 block mx-auto">
              Our app showcases housing trends backed by hard data and
              statistics, ensuring that every decision you make is
              well-informed, empowering you to make the best choices for your
              mortgage.
            </Text>
          </View>
        )}
        {index === 2 && (
          <View>
            <Image
              className="mt-24 h-[200px]"
              source={require("../assets/searching.png")}
            />
            <Text className="text-center w-4/5 block mx-auto font-bold">
              Gain Insights through Data Analysis
            </Text>
            <Text className="text-center w-4/5 block mx-auto">
              Take the stress out of mortgage planning with our comprehensive
              reports based on your own inputted data. Homestead your trusted
              companion in securing your dream home.
            </Text>
          </View>
        )}
        {index === 3 && (
          <View>
            <Image
              className="mt-24 h-[200px]"
              source={require("../assets/friends.png")}
            />
            <Text className="text-center w-4/5 block mx-auto font-bold">
              Your Personal Guide
            </Text>
            <Text className="text-center w-4/5 block mx-auto">
              Receive suggestions on how to improve and ways to increase your
              changes of getting approved. Get advice tailored specifically to
              you through the power of generative AI.
            </Text>
          </View>
        )}
      </View>
    );
  };
  let carouselItems = [
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 1",
      text: "Text 1",
    },
  ];

  return (
    <View className="h-screen">
      <SafeAreaProvider>
        <SafeAreaView className="h-full">
          <Text
            style={{ fontFamily: "Inter_700Bold", fontSize: 40 }}
            className="font-bold text-center mt-8"
          >
            Homestead
          </Text>
          <View className="mx-auto -ml-2">
            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              data={carouselItems}
              sliderWidth={400}
              itemWidth={400}
              renderItem={carousel_renderItem}
              onSnapToItem={(index) => setCarouselIndex(index)}
            />
          </View>
          <View className="pt-3 flex flex-row gap-2 justify-center relative">
            <View
              className={
                "bg-[#6C63FF] rounded-full " +
                (carouselIndex === 0 ? "w-2 h-2" : "w-1 h-1 top-[2px]")
              }
            ></View>
            <View
              className={
                "bg-[#6C63FF] rounded-full " +
                (carouselIndex === 1 ? "w-2 h-2" : "w-1 h-1 top-[2px]")
              }
            ></View>
            <View
              className={
                "bg-[#6C63FF] rounded-full " +
                (carouselIndex === 2 ? "w-2 h-2" : "w-1 h-1 top-[2px]")
              }
            ></View>
            <View
              className={
                "bg-[#6C63FF] rounded-full " +
                (carouselIndex === 3 ? "w-2 h-2" : "w-1 h-1 top-[2px]")
              }
            ></View>
          </View>

          <View className="absolute bottom-32 w-full">
            <Link
              className="mt-12 py-4 px-3 border-2 mx-8 border-[#6C63FF] rounded-md bg-white"
              href="/location/300000"
            >
              <Text className="text-center text-black">Location</Text>
            </Link>
            <Pressable
              className="mt-12 py-4 px-3 border-2 mx-8 border-[#6C63FF] rounded-md bg-white"
              onPress={() => goToStatic()}
            >
              <Text className="text-center text-black">View Trends</Text>
            </Pressable>
            <Pressable
              className="py-4 px-3 border mx-8 mt-4 border-[#6C63FF] rounded-md bg-[#6C63FF]"
              onPress={() => goToDynamic()}
            >
              <Text className="text-white text-center">Enter Metrics</Text>
            </Pressable>

            <Link className="mt-4 bg-white" href="/resources">
              <Text className="text-center text-black">
                Need help? Check our resources!
              </Text>
            </Link>
          </View>
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </View>
  );
}
