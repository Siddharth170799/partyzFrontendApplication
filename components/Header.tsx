// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // const Navbar = () => {
// //   return (
// //     <View style={styles.navbar}>
// //       <TouchableOpacity style={styles.navItem}>
// //         <Text style={styles.navText}>Function Hall Bookings</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.navItem}>
// //         <Text style={styles.navText}>Catering Services</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.navItem}>
// //         <Text style={styles.navText}>Event Planners</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.navItem}>
// //         <Text style={styles.navText}>Decorations</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   navbar: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     backgroundColor: 'orange',
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //   },
// //   navItem: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 10,
// //   },
// //   navText: {
// //     fontSize: 14,
// //     color: '#333',
// //   },
// // });

// // export default Navbar;
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const Navbar = () => {
//   return (
//     <View style={styles.navbar}>
//       <TouchableOpacity style={styles.navItem}>
//         <Text style={styles.navText} numberOfLines={1}>Function Hall Bookings</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navItem}>
//         <Text style={styles.navText} numberOfLines={1}>Catering Services</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navItem}>
//         <Text style={styles.navText} numberOfLines={1}>Event Planners</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navItem}>
//         <Text style={styles.navText} numberOfLines={1}>Decorations</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     elevation: 5,
//   },
//   navItem: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   navText: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '500',
//     textTransform: 'uppercase',
//   },
// });

// export default Navbar;


import Mycontext from '@/context/createContext';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Navbar = () => {

  return (
    <View style={styles.navbar}>
      <Text style={styles.navMainName}>Partyz</Text>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Hall Bookings</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>
          <Text>Catering</Text>
          <Text>Services</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Event Planners</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Decorations</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    elevation: 5,
  },navMainName:{
fontSize:30,
color:"white"
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  navText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    textTransform: 'uppercase',
    flexWrap: 'wrap', // allow text to wrap to next line
  },
});

export default Navbar;