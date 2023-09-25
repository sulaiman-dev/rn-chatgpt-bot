import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, List } from "react-native-paper";
import { getChatGPTResponse } from "./ChatGPTService";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim().length > 0) {
      setMessages([...messages, { text: input, sender: "user" }]);
      const response = await getChatGPTResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: "bot" },
      ]);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <List.Section>
        {messages.map((message, index) => (
          <List.Item
            key={index}
            title={message.text}
            description={message.sender}
          />
        ))}
      </List.Section>
      <TextInput
        label="Type your message"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={sendMessage}
        width="100%"
      />
      <Button onPress={sendMessage}>Send</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});
