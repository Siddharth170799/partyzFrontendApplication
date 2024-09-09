// import { Link, useNavigation } from "expo-router";

// import * as React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";

// export default function PartyzLandingPage() {
//   const navigation = useNavigation();
//   return (
//     <ImageBackground
//       source={require("../images/AdobeBackgroundImage.jpeg")} // Replace with your image path
//       style={styles.backgroundImage}
//       resizeMode="cover" // Ensures the image covers the entire screen
//     >
//       <View style={styles.container}>
//         <View style={styles.imageContainer}>
//           <Image source={require("../images/Logo.png")} style={styles.image} />
//         </View>

//         <TouchableOpacity
//           onPress={() => navigation.navigate("MainDashboardPage")}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%", // Ensure the background image covers the whole screen width
//     height: "100%", // Ensure the background image covers the whole screen height
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center", // Centers the content vertically
//     alignItems: "center", // Centers the content horizontally
//     width: "100%",
//   },
//   imageContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 40, // Space between image and button
//   },
//   image: {
//     width: 300, // Adjust the width of the image as needed
//     height: 300, // Adjust the height of the image as needed
//     resizeMode: "contain",
//     marginTop: 30, // Ensures the image scales properly within its bounds
//   },

//   button: {
//     backgroundColor: "transparent",
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.7)", // Light white border
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   footer: {
//     fontSize: 14,
//     color: "#fff",
//     textAlign: "center",
//   },
//   link: {
//     color: "#FF6347",
//     fontWeight: "bold",
//   },
// });

import { useState } from 'react';
import { useNavigation } from "expo-router";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable
} from "react-native";

export default function PartyzLandingPage() {
  const navigation = useNavigation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ImageBackground
      source={require("../images/AdobeBackgroundImage.jpeg")} // Replace with your image path
      style={styles.backgroundImage}
      resizeMode="cover" // Ensures the image covers the entire screen
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../images/Logo.png")} style={styles.image} />
        </View>

        <Pressable
          onPress={() => navigation.navigate("MainDashboardPage")}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          style={[
            styles.button,
            {
              backgroundColor: isHovered ? "green" : "transparent", // Change to green when hovered
            }
          ]}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    width: "100%", // Ensure the background image covers the whole screen width
    height: "100%", // Ensure the background image covers the whole screen height
  },
  container: {
    flex: 1,
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
    width: "100%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40, // Space between image and button
  },
  image: {
    width: 300, // Adjust the width of the image as needed
    height: 300, // Adjust the height of the image as needed
    resizeMode: "contain",
    marginTop: 30, // Ensures the image scales properly within its bounds
  },

  button: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.7)", // Light white border
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

