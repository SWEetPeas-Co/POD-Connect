import { StyleSheet, ScrollView } from "react-native";
import { events } from "@/data/events";

import DiscoverEventCard from "@/components/events/event-card-discover";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function Discover() {

  return (
    <ThemedView style={styles.mainContainer}>

      <ThemedView style={styles.headerContainer}>
        <ThemedText type="header">DISCOVER</ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.eventContent}>

        {events.map((event) => (
          <DiscoverEventCard
            key={event.id}
            title={event.title}
            tags={event.tags}
            headcount={event.headcount}
          />
        ))}

      </ScrollView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#98BA7B",
    paddingTop: 85,
  },

  headerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 65,
    backgroundColor: "#569170",
    justifyContent: "center",
    alignItems: "center",
  },

  eventContent: {
    padding: 16,
    gap: 15,
  },
});

// import {StyleSheet, ScrollView } from 'react-native';

// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';

// export default function HomeScreen() {
//   return (
//     <ThemedView style={styles.mainContainer}>

//       <ThemedView style={styles.headerContainer}>
//         <ThemedText type="header">DISCOVER</ThemedText>
//       </ThemedView>

//       <ThemedView style={styles.searchContainer}>
//         <ThemedView style={styles.sliderContainer}>
//             <ThemedText type="sliderDefault">Here is the Slider.</ThemedText>
//         </ThemedView>
//         <ThemedView style={styles.searchBarContainer}>
//             <ThemedText type="searchBar">Here is the Search Bar.</ThemedText>
//         </ThemedView>
//       </ThemedView>

//       <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>
//         <ThemedView style={styles.eventCardContainer}>
//             <ThemedView style={styles.eventCardContainerTop}>
//                 <ThemedView style={styles.eventCardImage}>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardText}>
//                     <ThemedText type="eventTitle">Event title.</ThemedText>
//                     <ThemedView style={styles.eventCardTagsGroup}>
//                         <ThemedView style={styles.eventCardTags}>
//                             <ThemedText type="eventTag">Another Tag</ThemedText>
//                         </ThemedView>
//                         <ThemedView style={styles.eventCardTags}>
//                             <ThemedText type="eventTag">Another Tag</ThemedText>
//                         </ThemedView>
//                     </ThemedView>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                     </ThemedView>
//                 </ThemedView>
//             </ThemedView>
//         </ThemedView>
//         <ThemedView style={styles.eventCardContainer}>
//             <ThemedView style={styles.eventCardContainerTop}>
//                 <ThemedView style={styles.eventCardImage}>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardText}>
//                     <ThemedText type="eventTitle">Event title.</ThemedText>
//                     <ThemedView style={styles.eventCardTagsGroup}>
//                         <ThemedView style={styles.eventCardTags}>
//                             <ThemedText type="eventTag">Another Tag</ThemedText>
//                         </ThemedView>
//                         <ThemedView style={styles.eventCardTags}>
//                             <ThemedText type="eventTag">Another Tag</ThemedText>
//                         </ThemedView>
//                     </ThemedView>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                     </ThemedView>
//                 </ThemedView>
//             </ThemedView>
//             <ThemedView style={styles.eventCardContainerBottom}>
//                 <ThemedText type="eventDescription">Here is the event description.</ThemedText>
//             </ThemedView>
//         </ThemedView>
//         <ThemedView style={styles.eventCardContainer}>
//             <ThemedView style={styles.eventCardContainerTop}>
//                 <ThemedView style={styles.eventCardImage}>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardText}>
//                     <ThemedText type="eventTitle">Event title.</ThemedText>
//                     <ThemedView style={styles.eventCardTagsGroup}>
//                         <ThemedView style={styles.eventCardTags}>
//                             <ThemedText type="eventTag">Another Tag</ThemedText>
//                         </ThemedView>
//                         <ThemedView style={styles.eventCardTags}>
//                             <ThemedText type="eventTag">Another Tag</ThemedText>
//                         </ThemedView>
//                     </ThemedView>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                     </ThemedView>
//                 </ThemedView>
//             </ThemedView>
//             <ThemedView style={styles.eventCardContainerBottom}>
//                 <ThemedText type="eventDescription">Here is the event description.</ThemedText>
//             </ThemedView>
//         </ThemedView>
//         <ThemedView style={styles.eventCardContainer}>
//             <ThemedView style={styles.eventCardContainerTop}>
//                 <ThemedView style={styles.eventCardImage}>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardText}>
//                     <ThemedText type="eventTitle">Event title.</ThemedText>
//                     <ThemedView style={styles.eventCardTagsGroup}>
//                         <ThemedView style={styles.eventCardTags}>
//                             <ThemedText type="eventTag">Another Tag</ThemedText>
//                         </ThemedView>
//                         <ThemedView style={styles.eventCardTags}>
//                             <ThemedText type="eventTag">Another Tag</ThemedText>
//                         </ThemedView>
//                     </ThemedView>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                     </ThemedView>
//                 </ThemedView>
//             </ThemedView>
//             <ThemedView style={styles.eventCardContainerBottom}>
//                 <ThemedText type="eventDescription">Here is the event description.</ThemedText>
//             </ThemedView>
//         </ThemedView>
//       </ScrollView>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#98BA7B',
//     paddingTop: 85,
//     gap: 15,
//   },
//   headerContainer: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: 65,
//     backgroundColor: '#569170',

//     shadowColor: '#4A7E61',
//     shadowRadius: 2,
//     shadowOffset: { width: 0, height: 5 },
    
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopLeftRadius: 0,
//     borderTopRightRadius: 0,
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//   },
//   searchContainer: {
//     height: 85,
//     width: '100%',
//     //backgroundColor: '#FFFFFF',

//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 15,
//     paddingHorizontal: 30,
//   },
//   sliderContainer: {
//     height: 35,
//     width: '100%',
//     backgroundColor: '#E6E1C3',

//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//   },
//   searchBarContainer: {
//     height: 35,
//     width: '100%',
//     backgroundColor: '#ffffff',

//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   eventContainer: {
//     flex: 1,
//     width: '100%',
//   },
//   eventContent: {
//     alignItems: 'center',
//     gap: 15,
//     paddingHorizontal: 16,
//     paddingBottom: 100,
//   },
//   eventCardContainer: {
//     width: '100%',
//     backgroundColor: '#E6E1C3',

//     shadowColor: '#569170',
//     shadowRadius: 1,
//     shadowOffset: { width: 3, height: 4 },

//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     padding: 12,
//   },
//   eventCardContainerTop: {
//     flexDirection: 'row',
//     height: 60,
//     width: '100%',
//     backgroundColor: '#E6E1C3',

//     justifyContent: 'space-between',
//   },
//   eventCardImage: {
//     height: 60,
//     width: 60,
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//   },
//   eventCardText: {
//     height: 60,
//     flex: 1,
//     alignItems: 'flex-start',
//     justifyContent: 'space-between', // changed for discover
//     paddingLeft: 10,
//     backgroundColor: '#E6E1C3',
//   },
//   eventCardRSVP: {
//     flexDirection: 'row', // added for discover
//     height: 60,
//     width: 90,
//     backgroundColor: '#E6E1C3',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-end',
//     gap: 10, // changed for discover
//   },
//   eventCardRSVPButton: {
//     height: 25,
//     width: 25, // changed for discover, will be star later
//     backgroundColor: '#98BA7B',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   eventCardContainerMiddle: {
//     height: 30,
//     width: '100%',
//     backgroundColor: '#E6E1C3',

//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   eventCardContainerBottom: {
//     width: '100%',
//     backgroundColor: '#E6E1C3',

//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     padding: 10, // changed for discover
//   },
//   eventCardTagsGroup: { // added for discover
//     flexDirection: 'row',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     gap: 10,
//     backgroundColor: '#E6E1C3',
//   },
//   eventCardTags: { // added for discover
//     maxHeight: 25,
//     backgroundColor: '#98BA7B',
//     borderRadius: 40,

//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//   },
// });
