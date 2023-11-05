import { StatusBar } from "expo-status-bar";
import { Button, Pressable, SafeAreaView, Text, View, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { useFonts, Inter_700Bold } from "@expo-google-fonts/inter";
import { Dimensions } from "react-native";
import { Link } from "expo-router";

import BackButton from "../components/BackButton";
import SliderBox from "../components/SliderBox";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioForm from "react-native-simple-radio-button";
import HR from "../components/HR";

const METRICS = {
  "Gross Monthly Income": {
    parameter_name: "gross_monthly_income",
    max_value: 100000,
    min_value: 0,
    step: 100,
    default_value: 6819,
    dollars: true,
  },
  "Credit Card Payment": {
    parameter_name: "credit_card_payment",
    max_value: 100000,
    min_value: 0,
    step: 100,
    default_value: 257,
    dollars: true,
  },
  "Car Payment": {
    parameter_name: "car_payment",
    max_value: 10000,
    min_value: 0,
    step: 100,
    default_value: 495,
    dollars: true,
  },
  "Student Loan Payments": {
    parameter_name: "student_loan_payments",
    max_value: 10000,
    min_value: 0,
    step: 100,
    default_value: 258,
    dollars: true,
  },
  "Appraised Value": {
    parameter_name: "appraised_value",
    max_value: 10000000,
    min_value: 0,
    step: 1000,
    default_value: 346246,
    dollars: true,
  },
  "Down Payment": {
    parameter_name: "down_payment",
    max_value: 1000000,
    min_value: 100,
    step: 1000,
    default_value: 72712,
    dollars: true,
  },
  "Loan Amount": {
    parameter_name: "loan_amount",
    max_value: 1000000,
    min_value: 100,
    step: 1000,
    default_value: 273534,
    dollars: true,
  },
  "Monthly Mortgage Payment": {
    parameter_name: "monthly_mortgage_payment",
    max_value: 10000,
    min_value: 10,
    step: 100,
    default_value: 1306,
    dollars: true,
  },
  "Credit Score": {
    parameter_name: "credit_score",
    max_value: 850,
    min_value: 300,
    step: 1,
    default_value: 777,
    dollars: false,
  }
};

export default function App() {
  const [openSliderIndex, setOpenSliderIndex] = useState(-1);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [whatShouldIChange, setWhatShouldIChange] = useState("Gross Monthly Income");  // 0 = income, 1 = appraised value, 2 = down payment, 3 = credit score
  const [lastFetched, setLastFetched] = useState("approval");
  const [responseData, setResponseData] = useState({});
  const [metricValues, setMetricValues] = useState({
    "Gross Monthly Income": METRICS["Gross Monthly Income"].default_value,
    "Credit Card Payment": METRICS["Credit Card Payment"].default_value,
    "Car Payment": METRICS["Car Payment"].default_value,
    "Student Loan Payments": METRICS["Student Loan Payments"].default_value,
    "Appraised Value": METRICS["Appraised Value"].default_value,
    "Down Payment": METRICS["Down Payment"].default_value,
    "Loan Amount": METRICS["Loan Amount"].default_value,
    "Monthly Mortgage Payment": METRICS["Monthly Mortgage Payment"].default_value,
    "Credit Score": METRICS["Credit Score"].default_value,
  });

  let [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  async function fetchApproval() {
    setLoading(true);
    const requestDataValues = {};
    for (const metricName in metricValues) {
      requestDataValues[METRICS[metricName].parameter_name] = metricValues[metricName];
    }

    const response = await fetch("https://homestead-backend-production.up.railway.app/run-one", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "value": requestDataValues
      }),
    });
    const data = await response.json();
    setResponseData(data);
    setLoading(false);
  }

  async function fetchImprovements() {
    setLoading(true);
    const requestDataValues = {};
    for (const metricName in metricValues) {
      requestDataValues[METRICS[metricName].parameter_name] = metricValues[metricName];
    }

    const response = await fetch("https://homestead-backend-production.up.railway.app/reverse-engineer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "value": requestDataValues,
        "change": METRICS[whatShouldIChange].parameter_name,
      }),
    });
    const data = await response.text();
    setResponseData(data);
    setLoading(false);
  }

  

  const radio_props = [
    {label: "Gross Monthly Income", value: "Gross Monthly Income" },
    {label: "Appraised Value", value: "Appraised Value" },
    {label: "Down Payment", value: "Down Payment" },
    {label: "Credit Score", value: "Credit Score" },
  ];
  

  return (
    <ScrollView className="h-screen" scrollEnabled={scrollEnabled}>
      <SafeAreaProvider>
        <SafeAreaView className="h-full mx-4">
          <BackButton />
          <Text
            style={{ fontFamily: "Inter_700Bold", fontSize: 40 }}
            className="font-bold mt-4 mb-4"
          >
            Metrics Calculation
          </Text>          

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
                  defaultValue={metric.default_value}
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

          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20 }} className="font-bold my-4 text-center">What should I change?</Text>
          <View className="mx-auto">
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {setWhatShouldIChange(value)}}
              buttonColor={"#6C63FF"}
            />
          </View>

          <Pressable className={"py-4 px-3 border mx-8 mt-4 border-[#6C63FF] rounded-md transition-colors " + (lastFetched === "approval" ? "bg-[#6C63FF]" : "")} onPress={() => {setLastFetched("approval"); fetchApproval()}}>
            {
              loading && lastFetched === "approval" ? 
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20 }} className={"text-center " + (lastFetched === "approval" ? "text-white" : "text-black")}>Loading...</Text>
              : <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20 }} className={"text-center " + (lastFetched === "approval" ? "text-white" : "text-black")}>Calculate Approval</Text>
            }
          </Pressable>
          <Pressable className={"py-4 px-3 border mx-8 mt-4 border-[#6C63FF] rounded-md transition-colors " + (lastFetched === "improvements" ? "bg-[#6C63FF]" : "")} onPress={() => {setLastFetched("improvements"); fetchImprovements()}}>
            {
              loading && lastFetched === "improvements" ? 
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20 }} className={"text-center " + (lastFetched === "improvements" ? "text-white" : "text-black")}>Loading...</Text>
              : <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20 }} className={"text-center " + (lastFetched === "improvements" ? "text-white" : "text-black")}>Calculate Improvements</Text>
            }
          </Pressable>

          <HR />

          <Text>{JSON.stringify(responseData)}</Text>
        
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ScrollView>
  );
}
