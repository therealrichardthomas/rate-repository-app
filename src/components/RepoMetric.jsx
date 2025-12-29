import { View, StyleSheet } from "react-native";
import Text from "./Text";

const formatValue = (value) => {
  if (value >= 1000) {
    return `${(Math.round(value / 100) / 10).toFixed(1)}k`
  }
  return value.toString();
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  value: {
    alignSelf: 'center',
  },
  metric: {
    alignSelf: 'center',
  }
})

const RepoMetric = ({metric, value}) => {
  let modifiedValue = formatValue(value);

  return (
    <View style={styles.container}>
      <Text fontSize="subheading" fontWeight="bold" style={styles.value}>{modifiedValue}</Text>
      <Text fontSize="subheading" color="textSecondary" style={styles.metric}>{metric}</Text>
    </View>
  );
}

export default RepoMetric;