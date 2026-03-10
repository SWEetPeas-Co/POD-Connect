import { StyleSheet, ScrollView } from "react-native";
import { events } from "@/data/events";
import { useState } from "react";

import EventCard from "@/components/events/event-card";
import Header from "@/components/header";
import SearchBar from "@/components/ui/search-bar";
import { ThemedView } from "@/components/themed-view";

export default function MyEvents() {
  const [search, setSearch] = useState("");
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemedView style={styles.mainContainer}>

      <Header title="MY EVENTS" />

      <ThemedView style={styles.searchContainer}>
        
        <ThemedView style={styles.searchRow}>
          <SearchBar value={search} onChangeText={setSearch} />
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.eventContainer} contentContainerStyle={styles.eventContent}>

        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            club={event.club}
            location={event.location}
            time={event.time}
            description={event.description}
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
    backgroundColor: '#98BA7B',
    paddingTop: 85,
    gap: 15,
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 30,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
    width: '100%',
  },
  eventContainer: {
    flex: 1,
    width: '100%',
  },
  eventContent: {
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});

// import {StyleSheet, ScrollView } from 'react-native';

// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';

// export default function HomeScreen() {
//   return (
//     <ThemedView style={styles.mainContainer}>

//       <ThemedView style={styles.headerContainer}>
//         <ThemedText type="header">MY EVENTS</ThemedText>
//       </ThemedView>

//       <ThemedView style={styles.searchContainer}>
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
//                     <ThemedText type="eventSubtitle">Event subtiitle.</ThemedText>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                         <ThemedText type="eventSubtitle">RSVP</ThemedText>
//                     </ThemedView>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                 </ThemedView>
//             </ThemedView>
//             <ThemedView style={styles.eventCardContainerMiddle}>
//                 <ThemedText type="eventSubtitle">Event Info like location here.</ThemedText>
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
//                     <ThemedText type="eventSubtitle">Event subtiitle.</ThemedText>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                         <ThemedText type="eventSubtitle">RSVP</ThemedText>
//                     </ThemedView>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                 </ThemedView>
//             </ThemedView>
//             <ThemedView style={styles.eventCardContainerMiddle}>
//                 <ThemedText type="eventSubtitle">Event Info like location here.</ThemedText>
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
//                     <ThemedText type="eventSubtitle">Event subtiitle.</ThemedText>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                         <ThemedText type="eventSubtitle">RSVP</ThemedText>
//                     </ThemedView>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                 </ThemedView>
//             </ThemedView>
//             <ThemedView style={styles.eventCardContainerMiddle}>
//                 <ThemedText type="eventSubtitle">Event Info like location here.</ThemedText>
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
//                     <ThemedText type="eventSubtitle">Event subtiitle.</ThemedText>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                         <ThemedText type="eventSubtitle">RSVP</ThemedText>
//                     </ThemedView>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                 </ThemedView>
//             </ThemedView>
//             <ThemedView style={styles.eventCardContainerMiddle}>
//                 <ThemedText type="eventSubtitle">Event Info like location here.</ThemedText>
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
//                     <ThemedText type="eventSubtitle">Event subtiitle.</ThemedText>
//                 </ThemedView>
//                 <ThemedView style={styles.eventCardRSVP}>
//                     <ThemedView style={styles.eventCardRSVPButton}>
//                         <ThemedText type="eventSubtitle">RSVP</ThemedText>
//                     </ThemedView>
//                     <ThemedText type="eventSubtitle">Head</ThemedText>
//                 </ThemedView>
//             </ThemedView>
//             <ThemedView style={styles.eventCardContainerMiddle}>
//                 <ThemedText type="eventSubtitle">Event Info like location here.</ThemedText>
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
//     justifyContent: 'center',
//     paddingLeft: 10,
//     backgroundColor: '#E6E1C3',
//   },
//   eventCardRSVP: {
//     height: 60,
//     width: 90,
//     backgroundColor: '#E6E1C3',
//     alignItems: 'flex-end',
//     gap: 4,
//   },
//   eventCardRSVPButton: {
//     height: 25,
//     width: 90,
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
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//   },
// });
