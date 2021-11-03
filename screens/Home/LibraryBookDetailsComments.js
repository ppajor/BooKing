import React from "react";
import Comment from "../../components/Comment";
import { StyleSheet, View, Image, TouchableHighlight, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import { global, globalSheet } from "../../styles";
import DefText from "../../components/DefText";

function LibraryBookDetailsComments({ comments, data, writeComment, ...props }) {
  return (
    <>
      <TextInput
        style={[globalSheet.input, styles.input]}
        multiline
        numberOfLines={6}
        value={writeComment}
        placeholder="Write a comment..."
        textAlignVertical="top"
        onChangeText={(text) => {
          props.setWriteComment(text);
        }}
      />
      <View style={{ width: "100%", marginBottom: 24 }}>
        <TouchableOpacity onPress={() => props.handleAddComment(data)} style={{ marginLeft: "auto", marginRight: 8 }}>
          <DefText size={12} color="#A8A8A8">
            Add comment
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
});
