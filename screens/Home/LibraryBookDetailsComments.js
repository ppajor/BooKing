import React, { useState } from "react";
import Comment from "../../components/Comment";
import { StyleSheet, View, Image, TouchableHighlight, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import { global, globalSheet } from "../../styles";
import { Rating } from "react-native-ratings";

import DefText from "../../components/DefText";

function LibraryBookDetailsComments({ comments, data, writeComment, ...props }) {
  const [wikusia, setWikusia] = useState(false);

  return (
    <>
      {wikusia && <Rating onFinishRating={(result) => console.log(result)} style={{ paddingVertical: 10 }} ratingCount={10} imageSize={20} />}
      <TextInput
        style={[globalSheet.input, styles.input]}
        multiline
        numberOfLines={6}
        value={writeComment}
        placeholder="Napisz komentarz..."
        textAlignVertical="top"
        onChangeText={(text) => {
          props.setWriteComment(text);
        }}
      />
      <View style={{ width: "100%", marginBottom: 24 }}>
        <TouchableOpacity onPress={() => props.handleAddComment(data)} style={[styles.commentBtn, globalSheet.btnNoFullWidth]}>
          <DefText size={12} color="#fff">
            Dodaj komentarz
          </DefText>
        </TouchableOpacity>
      </View>
      {comments && comments.map((item, idx) => <Comment key={idx.toString()} data={item} />)}
    </>
  );
}

export default LibraryBookDetailsComments;

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    paddingTop: 8,
  },
  commentBtn: {
    marginLeft: "auto",
    marginRight: 8,
  },
});
