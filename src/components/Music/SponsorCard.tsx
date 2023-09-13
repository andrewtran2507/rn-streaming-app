import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SponsorCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TMedia Pro</Text>
      <Text style={styles.body}>
      EDGARD VARÈSE, whom many refer to as the father of electronic music, was born in 1883 in Paris, France. He spent the first ten years of his life in Paris and Burgundy. Family pressures led him to prepare for a career as an engineer by studying mathematics and science.
      </Text>
      {/* <Text style={styles.link}>https://youtu.be/G0hQYfI70w4?si=c2mSlM8FGgai_p21</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    width: '94%',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  body: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: '400',
    color: '#ddd',
  },
  link: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: '400',
    color: '#FFD479',
  },
});
