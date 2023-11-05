
import { router } from "expo-router";
import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

type Props = {
  name: string;
  isOpen: boolean;
  onPress: () => void;
  onValueChange: (value: number) => void;
  setScrollEnabled: (value: boolean) => void;
  maxValue: number;
  minValue: number;
  step: number;
  defaultValue: number;
  lessThanGreaterThan: boolean;
  dollars: boolean;
};

import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { useState } from "react";



export default function SliderBox(props: Props) {

  const [sliderValue, setSliderValue] = useState(props.defaultValue);

  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const enableScroll = () => props.setScrollEnabled(true);
  const disableScroll = () => props.setScrollEnabled(false);

  const sliderValueString = (props.lessThanGreaterThan ? (sliderValue === props.maxValue ? "≥" : "") + (sliderValue === props.minValue ? "≤" : "") + " " : "") + (props.dollars ? "$" : "") + sliderValue.toLocaleString();

  return (
    <View className="border border-black rounded-md mb-4">
      <Pressable onPress={() => props.onPress()}>
        <View className="flex flex-row p-3 justify-between">
          <View className="relative pr-2 flex flex-row">
            <View className={"top-[-2px] " + (props.isOpen ? "rotate-90" : "")}>
              <Icon name="caret-right" size={28} color="#000" />
            </View>
            <Text style={{ fontFamily: props.isOpen ? "Inter_700Bold" : "Inter_400Regular", fontSize: 18 }} className="ml-2">{props.name}</Text>
          </View>
          <View>
            <Text style={{ fontFamily: props.isOpen ? "Inter_700Bold" : "Inter_400Regular", fontSize: 18 }}>{!props.isOpen && sliderValueString}</Text>
          </View>
        </View>
      </Pressable>
      {(props.isOpen &&
        <View className="mx-auto">
          <Text className="text-5xl text-right">{sliderValueString}</Text>
          <MultiSlider
            onValuesChangeStart={disableScroll}
            onValuesChangeFinish={enableScroll}
            onValuesChange={(e) => { setSliderValue(e[0]); props.onValueChange(e[0]); }}
            values={[sliderValue]}
            min={props.minValue}
            max={props.maxValue}
            step={props.step}
          />
        </View>
      )}
    </View>
  )
}

