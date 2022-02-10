import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import firebase from "firebase";
import Screen from "../../components/Screen";
import DefText from "../../components/DefText";
import { LineChart, ContributionGraph, BarChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";
import { getReadTimeByMonth, getHeatmap } from "../../api/firebaseCalls";
import MonthsModal from "./MonthsModal";
import HeatmapModal from "./HeatmapModal";
import { ScrollView } from "react-native-gesture-handler";
import { global } from "../../styles";

function StatsScreen() {
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [wholeData, setWholeData] = useState(null);
  const [monthsModalVisible, setMonthsModalVisible] = useState(false);
  const [heatmapModalVisible, setHeatmapModalVisible] = useState(false);
  const [heatmap, setHeatmap] = useState(null);
  const [chartWidth, setChartWidth] = useState(Dimensions.get("window").width);
  const [heatmapWidth, setHeatmapWidth] = useState(Dimensions.get("window").width);
  const [heatmapDays, setHeatmapDays] = useState(90);
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    getMonthData(startTime, stopTime);
  }, [startTime, stopTime]);

  useEffect(() => {
    const unsub = getHeatmapData();
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    var today = new Date();

    let currentMonth = today.getMonth() + 1;
    let day = today.getDate();
    //day 0 z przody
    if (day < 10) day = 0 + day.toString();
    //month 0 z przodu
    if (currentMonth < 10) currentMonth = 0 + currentMonth.toString();

    var date = today.getFullYear() + "-" + currentMonth + "-" + day;
    setCurrentDay(date);
    setStopTime(currentMonth);

    if (currentMonth - 4 < 0) {
      // jesli miesiac jest mniejszy od czwartego
      setStartTime(12 - (currentMonth % 4) + 1);
    } else {
      setStartTime(currentMonth - 4);
    }
  }, []);

  const getHeatmapData = () => {
    return firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/stats")
      .onSnapshot((querySnapshot) => {
        var snaps = [];
        querySnapshot.forEach((doc) => {
          const date3 = doc.data().year + "-" + doc.data().month + "-" + doc.data().day;
          const obj = { date: date3, count: doc.data().readTime };
          snaps.push(obj);
        });
        setHeatmap(snaps);
        console.log("SNAPS", snaps);
      });
  };

  const getMonthData = async (start, stop) => {
    const months = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

    let dataValues = [];
    let label = [];
    if (stop < start) {
      let one = months.slice(start - 1, months.length);
      let two = months.slice(0, stop);
      label = one.concat(two);

      for (let i = start; i <= months.length - 1; i++) {
        const result = await getReadTimeByMonth(i);
        dataValues.push(result);
      }
      for (let i = 0; i <= stop; i++) {
        const result = await getReadTimeByMonth(i);
        dataValues.push(result);
      }
    } else {
      label = months.slice(start - 1, stop);
      for (let i = start; i <= stop; i++) {
        const result = await getReadTimeByMonth(i);
        dataValues.push(result);
      }
    }

    let obj = { labels: label, datasets: [{ data: dataValues }] };
    setWholeData(obj);
  };

  return (
    <Screen>
      <View style={{ paddingVertical: 32, paddingHorizontal: 16, backgroundColor: "#f8f8f8" }}>
        <DefText family="Rubik-Bold" size={24} color={global.textColor}>
          Dostępne statystyki
        </DefText>

        {wholeData && heatmap && currentDay && stopTime && (
          <View>
            <View style={{ paddingTop: 32, paddingBottom: 16 }}>
              <DefText family="Rubik-Medium" align="center" color={global.textColor}>
                Czas czytania (w godzinach)
              </DefText>
            </View>
            <ScrollView horizontal>
              <BarChart
                data={wholeData}
                width={chartWidth}
                height={220}
                bezier
                withInnerLines={false}
                chartConfig={{
                  count: 12,
                  backgroundColor: "#1cc910",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(64, 57, 76, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: 16,
                }}
              />
            </ScrollView>
            <TouchableOpacity style={styles.filters} onPress={() => setMonthsModalVisible(true)}>
              <DefText family="OpenSans-LightItalic">Zmień filtry</DefText>
              <MaterialIcons style={{ marginLeft: 2 }} name="arrow-forward-ios" size={14} color="#a8a8a8" />
            </TouchableOpacity>
            <View style={{ paddingTop: 32, paddingBottom: 16 }}>
              <DefText family="Rubik-Medium" align="center" color={global.textColor}>
                Heatmapa
              </DefText>
            </View>
            <ScrollView horizontal>
              <ContributionGraph
                values={commitsData}
                endDate={currentDay}
                numDays={heatmapDays}
                width={heatmapWidth}
                height={220}
                chartConfig={chartConfig}
                style={{ borderRadius: 16 }}
              />
            </ScrollView>
            <TouchableOpacity style={styles.filters} onPress={() => setHeatmapModalVisible(true)}>
              <DefText family="OpenSans-LightItalic">Zmień filtry</DefText>
              <MaterialIcons style={{ marginLeft: 2 }} name="arrow-forward-ios" size={14} color="#a8a8a8" />
            </TouchableOpacity>

            <MonthsModal
              visible={monthsModalVisible}
              onClose={() => setMonthsModalVisible(false)}
              changeStartTime={(newStart) => setStartTime(stopTime - newStart)}
              handleChartWidth={(value) => setChartWidth(value)}
            />

            <HeatmapModal
              visible={heatmapModalVisible}
              onClose={() => setHeatmapModalVisible(false)}
              changeDays={(days) => setHeatmapDays(days)}
              handleHeatmapWidth={(value) => setHeatmapWidth(value)}
            />
          </View>
        )}
      </View>
    </Screen>
  );
}

export default StatsScreen;
const commitsData = [
  { date: "2017-01-19", count: 1 },
  { date: "2017-01-03", count: 2 },
  { date: "2017-01-22", count: 3 },
  { date: "2017-01-05", count: 4 },
  { date: "2017-01-06", count: 5 },
  { date: "2017-01-30", count: 2 },
  { date: "2017-01-31", count: 3 },
  { date: "2017-02-01", count: 2 },
  { date: "2017-01-02", count: 4 },
  { date: "2017-01-05", count: 2 },
  { date: "2017-01-30", count: 4 },
];
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginTop: 8,
  },
});
