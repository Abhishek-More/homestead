
import { router } from "expo-router";
import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

type Props = {
  name: string;
  isOpen: boolean;
  onPress: () => void;
  onValueChange: (value: number) => void;
  maxValue: number;
  minValue: number;
  step: number;
};

import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { useState } from "react";



export default function SliderBox(props: Props) {

  const [sliderValue, setSliderValue] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  return (
    <View className="border border-black rounded-md mb-4">
      <Pressable onPress={() => props.onPress()}>
        <View className="flex flex-row p-3">
          <View className="relative pr-2">
            <View className={"top-[-2px] " + (props.isOpen ? "rotate-90" : "")}>
              <Icon name="caret-right" size={28} color="#000" />
            </View>
          </View>
          <Text style={{ fontFamily: props.isOpen ? "Inter_700Bold" : "Inter_400Regular", fontSize: 20 }}>{props.name}</Text>
        </View>
      </Pressable>
      {(props.isOpen &&
        <View>
          <Text className="text-5xl">{sliderValue === props.maxValue && "≥"}{sliderValue === props.minValue && "≤"} {sliderValue}</Text>
          <MultiSlider
            onValuesChangeStart={disableScroll}
            onValuesChangeFinish={enableScroll}
            onValuesChange={(e) => { setSliderValue(e[0]) }}
            values={[sliderValue]}
            min={props.minValue}
            max={props.maxValue + 1}
            step={props.step}
          />
        </View>
      )}
    </View>
  )
}

