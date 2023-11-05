import { StatusBar } from "expo-status-bar";
import { Pressable, SafeAreaView, Text, View, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  useFonts,
  Inter_700Bold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { Link, router } from "expo-router";

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
    default_value: 9203,
    dollars: true,
  },
  "Credit Card Payment": {
    parameter_name: "credit_card_payment",
    max_value: 100000,
    min_value: 0,
    step: 100,
    default_value: 475,
    dollars: true,
  },
  "Car Payment": {
    parameter_name: "car_payment",
    max_value: 10000,
    min_value: 0,
    step: 100,
    default_value: 433,
    dollars: true,
  },
  "Student Loan Payments": {
    parameter_name: "student_loan_payments",
    max_value: 10000,
    min_value: 0,
    step: 100,
    default_value: 342,
    dollars: true,
  },
  "Appraised Value": {
    parameter_name: "appraised_value",
    max_value: 10000000,
    min_value: 0,
    step: 1000,
    default_value: 236893,
    dollars: true,
  },
  "Down Payment": {
    parameter_name: "down_payment",
    max_value: 1000000,
    min_value: 100,
    step: 1000,
    default_value: 42640,
    dollars: true,
  },
  "Loan Amount": {
    parameter_name: "loan_amount",
    max_value: 1000000,
    min_value: 100,
    step: 1000,
    default_value: 194252,
    dollars: true,
  },
  "Monthly Mortgage Payment": {
    parameter_name: "monthly_mortgage_payment",
    max_value: 10000,
    min_value: 10,
    step: 100,
    default_value: 1900,
    dollars: true,
  },
  "Credit Score": {
    parameter_name: "credit_score",
    max_value: 850,
    min_value: 300,
    step: 1,
    default_value: 699,
    dollars: false,
  },
};

export default function App() {
  const [openSliderIndex, setOpenSliderIndex] = useState(-1);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [whatShouldIChange, setWhatShouldIChange] = useState(
    "Gross Monthly Income"
  ); // 0 = income, 1 = appraised value, 2 = down payment, 3 = credit score
  const [lastFetched, setLastFetched] = useState("none");
  const [responseData, setResponseData] = useState({});
  const [metricValues, setMetricValues] = useState({
    "Gross Monthly Income": METRICS["Gross Monthly Income"].default_value,
    "Credit Card Payment": METRICS["Credit Card Payment"].default_value,
    "Car Payment": METRICS["Car Payment"].default_value,
    "Student Loan Payments": METRICS["Student Loan Payments"].default_value,
    "Appraised Value": METRICS["Appraised Value"].default_value,
    "Down Payment": METRICS["Down Payment"].default_value,
    "Loan Amount": METRICS["Loan Amount"].default_value,
    "Monthly Mortgage Payment":
      METRICS["Monthly Mortgage Payment"].default_value,
    "Credit Score": METRICS["Credit Score"].default_value,
  });

  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  async function fetchAiSuggestion(reasons) {
    const response = await fetch(
      "https://homestead-backend-production.up.railway.app/get-suggestion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          factors: reasons,
        }),
      }
    );
    const data = {
      suggestion: await response.text(),
    };
    if (lastFetched === "approval") {
      const newResponseData = { ...responseData };
      newResponseData.aiSuggestion = data.suggestion;
      setResponseData(newResponseData);
    }
  }

  async function fetchApproval() {
    setLoading(true);
    const requestDataValues = {};
    for (const metricName in metricValues) {
      requestDataValues[METRICS[metricName].parameter_name] =
        metricValues[metricName];
    }

    const response = await fetch(
      "https://homestead-backend-production.up.railway.app/run-one",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: requestDataValues,
        }),
      }
    );
    const data = await response.json();
    data.reasonsForRejection = [];
    const promptReasons = [];
    if (data["credit_score_check"].value === 1) {
      data.reasonsForRejection.push("Credit Score");
      promptReasons.push("credit");
    }
    if (data["ltv_check"].value === 1) {
      data.reasonsForRejection.push("Loan-to-Value Ratio");
      promptReasons.push("ltv");
    }
    if (data["dti_36_check"].value === 1) {
      data.reasonsForRejection.push("Debt-to-Income");
      promptReasons.push("dti_36");
    } else if (data["dti_43_check"].value === 1) {
      data.reasonsForRejection.push("Debt-to-Income");
      promptReasons.push("dti_43");
    }
    if (data["fedti_check"].value === 1) {
      data.reasonsForRejection.push("Front-End Debt-to-Income");
      promptReasons.push("fedt");
    }
    data.aiSuggestion = "Loading...";
    // fetchAiSuggestion(promptReasons);
    setResponseData(data);
    console.log(data);
    setLoading(false);
  }

  async function fetchImprovements() {
    setLoading(true);
    const requestDataValues = {};
    for (const metricName in metricValues) {
      requestDataValues[METRICS[metricName].parameter_name] =
        metricValues[metricName];
    }

    if (whatShouldIChange === "Credit Score" || whatShouldIChange === "Down Payment") {
      setResponseData({ suggestion: "This has not been implemented yet :)" });
      setLoading(false);
      return;
    }

    const response = await fetch(
      "https://homestead-backend-production.up.railway.app/reverse-engineer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: requestDataValues,
          change: METRICS[whatShouldIChange].parameter_name,
        }),
      }
    );
    const data = {
      suggestion: await response.text(),
    };
    setResponseData(data);
    console.log(data);
    setLoading(false);
  }

  async function fetchMaxLoan() {
    console.log("AAAAAAA");
    setLoading(true);
    const requestDataValues = {};
    for (const metricName in metricValues) {
      requestDataValues[METRICS[metricName].parameter_name] =
        metricValues[metricName];
    }

    const response = await fetch(
      "https://homestead-backend-production.up.railway.app/reverse-engineer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: requestDataValues,
          change: METRICS["Appraised Value"].parameter_name,
        }),
      }
    );
    const data = {
      suggestion: await response.text(),
    };
    setResponseData(data);
    console.log(requestDataValues);
    // Use a regular expression to extract the number
    const regex = /(\d+(\.\d+)?)/;
    const match = data.suggestion.match(regex);

    // Check if a number is found
    if (match) {
      const number = parseInt(match[0]);
      console.log("Extracted number:", number);
      router.push(`/location/${number}`);
    } else {
      router.push(`/location/${metricValues["Appraised Value"]}`);
      console.log("No number found in the input string.");
    }
    console.log(data);
    setLoading(false);
  }

  const radio_props = [
    { label: "Gross Monthly Income", value: "Gross Monthly Income" },
    { label: "Appraised Value", value: "Appraised Value" },
    { label: "Down Payment", value: "Down Payment" },
    { label: "Credit Score", value: "Credit Score" },
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
                  onPress={() =>
                    setOpenSliderIndex(index === openSliderIndex ? -1 : index)
                  }
                  maxValue={metric.max_value}
                  minValue={metric.min_value}
                  step={metric.step}
                  defaultValue={metric.default_value}
                  onValueChange={(value) => {
                    const newMetricValues = { ...metricValues };
                    newMetricValues[metricName] = value;
                    setMetricValues(newMetricValues);
                  }}
                  setScrollEnabled={setScrollEnabled}
                  lessThanGreaterThan={metric.dollars}
                  dollars={metric.dollars}
                />
              );
            })}
          </View>

          <Text
            style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}
            className="font-bold my-4 text-center"
          >
            What should I change?
          </Text>
          <View className="mx-auto">
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {
                setWhatShouldIChange(value);
              }}
              buttonColor={"#6C63FF"}
            />
          </View>

          <Pressable
            className={
              "py-4 px-3 border mx-8 mt-4 border-[#6C63FF] rounded-md transition-colors " +
              (lastFetched === "approval" ? "bg-[#6C63FF]" : "")
            }
            onPress={() => {
              setLastFetched("approval");
              fetchApproval();
            }}
          >
            {loading && lastFetched === "approval" ? (
              <Text
                style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}
                className={
                  "text-center " +
                  (lastFetched === "approval" ? "text-white" : "text-black")
                }
              >
                Loading...
              </Text>
            ) : (
              <Text
                style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}
                className={
                  "text-center " +
                  (lastFetched === "approval" ? "text-white" : "text-black")
                }
              >
                Calculate Approval
              </Text>
            )}
          </Pressable>
          <Pressable
            className={
              "py-4 px-3 border mx-8 mt-4 border-[#6C63FF] rounded-md transition-colors " +
              (lastFetched === "improvements" ? "bg-[#6C63FF]" : "")
            }
            onPress={() => {
              setLastFetched("improvements");
              fetchImprovements();
            }}
          >
            {loading && lastFetched === "improvements" ? (
              <Text
                style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}
                className={
                  "text-center " +
                  (lastFetched === "improvements" ? "text-white" : "text-black")
                }
              >
                Loading...
              </Text>
            ) : (
              <Text
                style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}
                className={
                  "text-center " +
                  (lastFetched === "improvements" ? "text-white" : "text-black")
                }
              >
                Calculate Improvements
              </Text>
            )}
          </Pressable>

          <Pressable
            className={
              "py-4 px-3 border mx-8 mt-4 border-[#6C63FF] rounded-md transition-colors " +
              (lastFetched === "location" ? "bg-[#6C63FF]" : "")
            }
            onPress={() => {
              setLastFetched("location");
              fetchMaxLoan();
            }}
          >
            {loading && lastFetched === "location" ? (
              <Text
                style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}
                className={
                  "text-center " +
                  (lastFetched === "location" ? "text-white" : "text-black")
                }
              >
                Loading...
              </Text>
            ) : (
              <Text
                style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}
                className={
                  "text-center " +
                  (lastFetched === "location" ? "text-white" : "text-black")
                }
              >
                Opportunities Near You
              </Text>
            )}
          </Pressable>

          <View className="my-6">
            <HR />
          </View>

          {lastFetched === "approval" && !loading ? (
            <View className="mb-10">
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 30 }}>
                Prediction:
              </Text>
              <Text
                style={{ fontFamily: "Inter_400Regular", fontSize: 30 }}
                className={
                  "text-right mb-8 " +
                  (responseData.approved.value === "Y"
                    ? "text-green-500"
                    : "text-red-500")
                }
              >
                {responseData.approved.value === "Y"
                  ? "Approved"
                  : "Not Approved"}
              </Text>

                {responseData.approved.value === "N" && <View>
                  <Text style={{ fontFamily: "Inter_700Bold", fontSize: 30 }}>Reason{responseData.reasonsForRejection.length === 1 ? "" : "s"}:</Text>
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 30 }} className={"text-right mb-8 "}>{responseData.reasonsForRejection.join(", ")}</Text>
                
                  {/* <Text style={{ fontFamily: "Inter_700Bold", fontSize: 30 }}>AI Suggestion:</Text>
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 30 }} className={"text-right mb-8 "}>{responseData.aiSuggestion}</Text> */}
                </View> }      

                <Text style={{ fontFamily: "Inter_700Bold", fontSize: 30 }}>Loan-To-Value:</Text>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 30 }} className={"text-right mb-8 " + (responseData.ltv_check.value === 1 ? "text-red-500" : "")}>{responseData.LTV.value}</Text>
       
                <Text style={{ fontFamily: "Inter_700Bold", fontSize: 30 }}>Debt-To-Income:</Text>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 30 }} className={"text-right mb-8 " + (responseData.dti_43_check.value === 1 || responseData.dti_36_check.value === 1 ? "text-red-500" : "")}>{responseData.DTI.value}</Text>

                <Text style={{ fontFamily: "Inter_700Bold", fontSize: 30 }}>Front-End Debt-To-Income:</Text>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 30 }} className={"text-right mb-8 " + (responseData.fedti_check.value === 1 ? "text-red-500" : "")}>{responseData.FEDTI.value}</Text>
              </View>
            )
            : <></>
          }
          {
            lastFetched === "improvements" && !loading ? (
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 20 }} className="mb-10">{responseData.suggestion}</Text>
            )
            : <></>
          }
        
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ScrollView>
  );
}
