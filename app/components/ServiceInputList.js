import React, { useRef } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./AppButton";
import colors from "../config/colors";

import defaultStyles from "../config/styles";

function ServiceInputList({ services = [], onToggleService }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
      >
        <View style={styles.container}>
          {services.map((service) => (
            <View key={service.id} style={styles.service}>
              <TouchableOpacity style={service.selected ? styles.selected : styles.button}
                    onPress={() => onToggleService(service)}
                    >
                    {service.selected && (
                        <MaterialCommunityIcons
                            name={"check"}
                            size={20}
                            color={"#10b981"}
                            style={styles.icon}
                        />
                    )}
                    <Text style={styles.text}>{service.name}</Text>
              </TouchableOpacity>
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
  icon: {
    marginRight: 10,
  },
  button: {
        flexDirection: 'row',
        backgroundColor: colors.light,
        borderRadius: 25,
        padding: 15,
        width: '100%',
        marginVertical: 2,
   },
   selected: {
        flexDirection: 'row',
        backgroundColor: "#d1fae5",
        borderColor: "#10b981",
        borderRadius: 25,
        padding: 15,
        width: '100%',
        marginVertical: 2,
   },
    text: {
        color: colors.medium,
        fontSize: 15,
    }
});

export default ServiceInputList;
