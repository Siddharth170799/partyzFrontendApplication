import { useState } from "react";
import { useNavigation } from "expo-router";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";

export default function PartyzLandingPage() {
  const navigation = useNavigation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ImageBackground
      source={require("../images/AdobeBackgroundImage.jpeg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../images/Logo.png")} style={styles.image} />
        </View>

        <Pressable
          onPress={() => navigation.navigate("UserLoginPage")}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          style={[
            styles.button,
            {
              backgroundColor: isHovered ? "green" : "transparent",
            },
          ]}
        >
          <Text style={styles.buttonText}>Get Started as User</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("SupervisorDashboardPage")}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          style={[
            styles.button,
            {
              backgroundColor: isHovered ? "green" : "transparent",
            },
          ]}
        >
          <Text style={styles.buttonText}>Get Started as Supervisor</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginTop: 30,
  },

  button: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  link: {
    color: "#FF6347",
    fontWeight: "bold",
  },
});
