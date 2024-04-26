import { Text } from "@mantine/core";
import "./App.css";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { AreaChartComp } from "./components/AreaChart";
import { BarChartComp } from "./components/BarChart";
import { PieChartComp } from "./components/PieChart";
import { DonutChartComp } from "./components/Donut";

function App() {
    const [filteredData, setFilteredData] = useState([]);
    const [dateData, setDateData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [topicData, setTopicData] = useState([]);
    const [regionData, setRegionData] = useState([]);

    // function find the distinct values of a given key in an array of objects
    const extractDistinctValues = (dataArray, key) => {
        const distinctValues = new Set(); // Using a Set to ensure uniqueness

        // Iterate through each object in the array
        dataArray.forEach((obj) => {
            if (obj[key] !== null && obj[key] !== undefined) {
                distinctValues.add(obj[key]); // Add the value to the set
            }
        });

        return Array.from(distinctValues); // Convert the Set to an array
    };

    // Function to find the distinct values of a given key in an array of objects
    const extractDistinctValuesWithCounts = (dataArray, key) => {
        const counts = {}; // Object to store counts of each distinct value

        // Iterate through each object in the array
        dataArray.forEach((obj) => {
            if (obj[key] !== null && obj[key] !== undefined) {
                // Increment count for the value or initialize to 1
                counts[obj[key]] = (counts[obj[key]] || 0) + 1;
            }
        });

        // Convert counts object to array of objects
        const distinctData = Object.keys(counts).map((name) => ({
            name,
            value: counts[name],
            color: getRandomLightColor(),
        }));

        return distinctData;
    };

    // Function to generate a random light color
    const getRandomLightColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 4; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        color += "FF";
        return color;
    };

    useEffect(() => {
        const distinctYears = extractDistinctValuesWithCounts(filteredData, "start_year");
        setDateData(distinctYears);
        const distinctCountry = extractDistinctValuesWithCounts(filteredData, "country");
        setCountryData(distinctCountry);
        const distinctTopics = extractDistinctValuesWithCounts(filteredData, "topic");
        setTopicData(distinctTopics);
        const distinctRegion = extractDistinctValuesWithCounts(filteredData, "region");
        setRegionData(distinctRegion);
    }, [filteredData]);

    return (
        <div className="App">
            <Header
                setFilteredData={setFilteredData}
                extractDistinctValues={extractDistinctValues}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    gap: "20px",
                    width: "100%",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        background: "#313131",
                        width: "30%",
                        height: "260px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        padding: "10px 10px",
                        overflow: "auto",
                    }}
                >
                    <Text align="center" style={{ fontWeight: "600" }}>
                        Intesity
                    </Text>
                    <AreaChartComp
                        data={filteredData.slice(0, 20)}
                        value={"intensity"}
                        color={"yellow"}
                        curve={"linear"}
                    />
                </div>
                <div
                    style={{
                        background: "#313131",
                        width: "30%",
                        height: "260px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        padding: "10px 10px",
                    }}
                >
                    <Text align="center" style={{ fontWeight: "600" }}>
                        Likelihood
                    </Text>
                    <AreaChartComp
                        data={filteredData.slice(0, 20)}
                        value={"likelihood"}
                        color={"teal"}
                        curve={"monotone"}
                    />
                </div>
                <div
                    style={{
                        background: "#313131",
                        width: "30%",
                        height: "260px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        padding: "10px 10px",
                    }}
                >
                    <Text align="center" style={{ fontWeight: "600" }}>
                        Relevance
                    </Text>
                    <BarChartComp
                        data={filteredData.slice(0, 20)}
                        value={"relevance"}
                        color={"cyan"}
                    />
                </div>
                <div
                    style={{
                        background: "#313131",
                        width: "15%",
                        height: "260px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        padding: "10px 10px",
                    }}
                >
                    <Text align="center" style={{ fontWeight: "600" }}>
                        Start Year
                    </Text>
                    <PieChartComp data={dateData} />
                </div>
                <div
                    style={{
                        background: "#313131",
                        width: "15%",
                        height: "260px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        padding: "10px 10px",
                    }}
                >
                    <Text align="center" style={{ fontWeight: "600" }}>
                        Country
                    </Text>
                    <DonutChartComp data={countryData} />
                </div>
                <div
                    style={{
                        background: "#313131",
                        width: "15%",
                        height: "260px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        padding: "10px 10px",
                    }}
                >
                    <Text align="center" style={{ fontWeight: "600" }}>
                        Topics
                    </Text>
                    <PieChartComp data={topicData} />
                </div>{" "}
                <div
                    style={{
                        background: "#313131",
                        width: "15%",
                        height: "260px",
                        flexGrow: 1,
                        borderRadius: "5px",
                        padding: "10px 10px",
                    }}
                >
                    <Text align="center" style={{ fontWeight: "600" }}>
                        Region
                    </Text>
                    <DonutChartComp data={regionData} />
                </div>
            </div>
        </div>
    );
}

export default App;
