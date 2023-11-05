import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Image } from "react-native";
import { Callout } from "react-native-maps";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

import * as Location from "expo-location";
import BackButton from "../components/BackButton";

const url =
  "https://zillow69.p.rapidapi.com/search?polygon=-71.1213684%2042.4239634%2C-71.0873795%2042.4252305%2C-71.0863495%2042.4090091%2C-71.1182785%2042.4072347%2C-71.1210251%2042.4229496%2C-71.1213684%2042.4239634&status_type=ForSale&home_type=Houses";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "15071c717cmsh5696054e89a3a41p10dbd7jsn037e3fe1f9e5",
    "X-RapidAPI-Host": "zillow69.p.rapidapi.com",
  },
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [respData, setRespData] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const lat = location?.coords?.latitude || 37.78825;
      const long = location?.coords?.longitude || -122.4324;
      console.log("RUNNING");

      const range = 1;
      const url = `https://zillow69.p.rapidapi.com/search?polygon=${
        long - range
      }%20${lat - range}%2C${long + range}%20${lat - range}%2C${
        long + range
      }%20${lat + range}%2C${long - range}%20${lat - range}%2C${
        long - range
      }%20${lat - range}&status_type=ForSale&home_type=Houses`;

      try {
        console.log(url);
        const response = await fetch(url, options);
        const result = await response.json();
        setRespData(result);

        const houses = result.props;
        let temp = [];

        houses.forEach((house) => {
          const lat = house.latitude;
          const long = house.longitude;
          const url = "https://www.zillow.com/" + house.detailUrl;
          const price = house.zestimate;
          const image = house.imgSrc;

          if (lat && long && url && price) {
            const obj = {
              latitude: lat,
              longitude: long,
              price: price.toString(),
              url: url,
              image:
                image ||
                "https://photos.zillowstatic.com/fp/91be7ca88283edf5ffa4628f246d085e-p_e.jpg",
            };
            temp.push(obj);
            console.log(obj);
          }
        });

        setMarkers(temp);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(location);
  }

  return (
    <View style={styles.container}>
      <View className="mx-4">
        <BackButton />
      </View>
      <Text className="text-xl font-medium absolute flex justify-center w-full text-center">
        Nearby Houses
      </Text>
      {!location && <Text>Loading...</Text>}
      {location && respData && (
        <MapView
          showsUserLocation
          initialRegion={{
            latitude: location?.coords?.latitude || 37.78825,
            longitude: location?.coords?.longitude || -122.4324,
            latitudeDelta: 0.0922 * 2,
            longitudeDelta: 0.0421 * 2,
          }}
          style={styles.map}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.price}
              image={marker.imgSrc}
              description={"FOR SALE"}
            >
              <Image
                style={{ height: 50, width: 50 }}
                source={{ uri: marker.image }}
              />

              <Callout>
                <View className="flex flex-col w-[150px] p-1">
                  <Text className="text-lg">Price: ${marker.price}</Text>
                  <Link className="underline" href={marker.url}>
                    Visit Zillow Page
                  </Link>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
});
