import { StatusBar } from "expo-status-bar";
import { Button, Pressable, SafeAreaView, Text, View, ScrollView } from "react-native";
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
import SliderBox from "../components/SliderBox";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const [openSliderIndex, setOpenSliderIndex] = useState(-1);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [metricValues, setMetricValues] = useState({
    "Gross Monthly Income": 0,
    "Credit Card Payment": 0,
    "Car Payment": 0,
    "Student Loan Payments": 0,
    "Appraised Value": 0,
    "Down Payment": 1000,
    "Loan Amount": 1000,
    "Monthly Mortgage Payment": 10,
    "Credit Score": 300,
  });

  let [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  async function fetchData() {
    setLoading(true);
    const requestData = {};
    for (const metricName in metricValues) {
      requestData[METRICS[metricName].parameter_name] = metricValues[metricName];
    }

    const response = await fetch("https://homestead-backend-production.up.railway.app/run-one", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"value": requestData}),
    });
    const data = await response.json();
    setResponseData(data);
    setLoading(false);
  }

  const METRICS = {
    "Gross Monthly Income": {
      parameter_name: "gross_monthly_income",
      max_value: 100000,
      min_value: 0,
      step: 100,
      dollars: true,
    },
    "Credit Card Payment": {
      parameter_name: "credit_card_payment",
      max_value: 100000,
      min_value: 0,
      step: 100,
      dollars: true,
    },
    "Car Payment": {
      parameter_name: "car_payment",
      max_value: 10000,
      min_value: 0,
      step: 100,
      dollars: true,
    },
    "Student Loan Payments": {
      parameter_name: "student_loan_payments",
      max_value: 10000,
      min_value: 0,
      step: 100,
      dollars: true,
    },
    "Appraised Value": {
      parameter_name: "appraised_value",
      max_value: 10000000,
      min_value: 0,
      step: 1000,
      dollars: true,
    },
    "Down Payment": {
      parameter_name: "down_payment",
      max_value: 1000000,
      min_value: 100,
      step: 1000,
      dollars: true,
    },
    "Loan Amount": {
      parameter_name: "loan_amount",
      max_value: 1000000,
      min_value: 100,
      step: 1000,
      dollars: true,
    },
    "Monthly Mortgage Payment": {
      parameter_name: "monthly_mortgage_payment",
      max_value: 10000,
      min_value: 10,
      step: 100,
      dollars: true,
    },
    "Credit Score": {
      parameter_name: "credit_score",
      max_value: 850,
      min_value: 300,
      step: 1,
      dollars: false,
    }
  };


  return (
    <ScrollView className="h-screen" scrollEnabled={scrollEnabled}>
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
          <Text className="mb-10">DYNAMIC {openSliderIndex}</Text>

          <View>
            {Object.keys(METRICS).map((metricName, index) => {
                const metric = METRICS[metricName];
                return (
                  <SliderBox
                  key={index}
                  name={metricName}
                  isOpen={openSliderIndex === index}
                  onPress={() => setOpenSliderIndex(index === openSliderIndex ? -1 : index)}
                  maxValue={metric.max_value}
                  minValue={metric.min_value}
                  step={metric.step}
                  onValueChange={(value) => {
                    const newMetricValues = {...metricValues};
                    newMetricValues[metricName] = value;
                    setMetricValues(newMetricValues);
                  }}
                  setScrollEnabled={setScrollEnabled}
                  lessThanGreaterThan={metric.dollars}
                  dollars={metric.dollars}
                  />
                )
              })}
          </View>

          <Pressable className="py-4 px-3 border mx-8 mt-4 border-[#6C63FF] rounded-md bg-[#6C63FF]" onPress={() => {fetchData()}}>
            {
              loading ? 
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20 }} className="text-white text-center">Loading...</Text>
              : <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20 }} className="text-white text-center">Calculate</Text>
            }
          </Pressable>

          <Text>{JSON.stringify(responseData)}</Text>
        
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ScrollView>
  );
}
