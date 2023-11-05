
import { router } from "expo-router";
import { Button, Pressable, SafeAreaView, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function BackButton() {
  function goToIndex() {
    router.replace("/");
  }

  return (
  <Pressable onPress={() => goToIndex()}>
    <Icon name="arrow-left" size={30} color="#000" />
  </Pressable>
  )
}

