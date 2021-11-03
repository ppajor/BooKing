import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Review from "../../components/Review";
import DefText from "../../components/DefText";
import { global } from "../../styles";

function LibraryBookDetailsReviews({ reviews }) {
  const data = [
    {
      id: 1,
      author: "dupa",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sodales euismod felis nam diam duis ut. Sit venenatis odio enim placerat erat. Est dignissim nunc mollis amet posuere tempus amet condimentum. Lacus odio mauris ut integer lacus lacus posuere venenatis sed. Arcu, magna ut lobortis arcu massa pretium, pulvinar. Est dignissim nunc mollis amet posuere tempus amet condimentum. Arcu massa pretium, pulvina amet posuere tempus...",
    },
    {
      id: 2,
      author: "cycki",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu sodales euismod felis nam diam duis ut. Sit venenatis odio enim placerat erat. Est dignissim nunc mollis amet posuere tempus amet condimentum. Lacus odio mauris ut integer lacus lacus posuere venenatis sed. Arcu, magna ut lobortis arcu massa pretium, pulvinar. Est dignissim nunc mollis amet posuere tempus amet condimentum. Arcu massa pretium, pulvina amet posuere tempus...",
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.review}>
              <Review data={item} separator={false} />
            </View>
          )}
        />
      </View>
    </>
  );
}

export default LibraryBookDetailsReviews;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 330,
    display: "flex",
    flexDirection: "row",
  },
  review: {
    width: 300,
    padding: 16,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#f1f1f1",
    borderRadius: 12,
  },
});
