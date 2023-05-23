import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import AppButton from "./AppButton";

function ServiceInputList({ services = [], onToggleService }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {services.map((service) => (
            <View key={service.value} style={styles.service}>
              <AppButton
                title={service.label}
                onPress={() => onToggleService(service)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  service: {
    marginTop: 10,
    width: "100%",
  },
});

export default ServiceInputList;
