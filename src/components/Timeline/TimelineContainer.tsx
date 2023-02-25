import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ComponentSeparator from "../Sperator";
import TimelineCard from "./TimelineCard";
// import { Flow } from "react-native-animated-spinkit";

const data = {
  petName: "Chocolate",
  information: "Kyr B pyout thr wr",
  _owner: {
    fullname: "Nay Yaung Lin Lakk",
    profileUrl: "https://avatars.githubusercontent.com/u/45455924?v=4"
  },
  photos: [
    {
      url: "https://images.pexels.com/photos/15563929/pexels-photo-15563929.png?auto=compress&cs=tinysrgb&w=800"
    }
  ]
};
const TimelineContainer = ({ queryKey }: { queryKey: string }) => {
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "#fff" }}
        ItemSeparatorComponent={ComponentSeparator}
        data={Array(12).fill(data)}
        renderItem={({ item, index }) => <TimelineCard {...{ item, index }} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TimelineContainer;
