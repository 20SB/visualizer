import { Group, Text, Box, rem, Avatar, Menu, Button } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import {
    IconChevronLeft,
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
} from "@tabler/icons-react";
import classes from "./Header.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export function Header({ setFilteredData, extractDistinctValues }) {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [data, setData] = useState([]);
    const [showItem, setShowItem] = useState(false);
    const [showSubItem, setShowSubItem] = useState(false);
    const [subTopics, setSubTopics] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedKey, setSelectedKey] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        // function for fetching data
        const getData = () => {
            axios.get(`${BACKEND_URL}/data`).then(({ data }) => {
                // data = data.slice(0, 50);
                console.log("data", data);
                setData(data);
            });
        };
        getData();
    }, []);

    // Organize the result in the specified format
    const topics = [
        {
            category: "Countries",
            key: "country",
            subtopics: extractDistinctValues(data, "country"),
        },
        {
            category: "End Years",
            key: "end_year",
            subtopics: extractDistinctValues(data, "end_year"),
        },
        {
            category: "Source",
            key: "source",
            subtopics: extractDistinctValues(data, "source"),
        },
        {
            category: "Region ",
            key: "region",
            subtopics: extractDistinctValues(data, "region"),
        },
        {
            category: "Sector",
            key: "sector",
            subtopics: extractDistinctValues(data, "sector"),
        },
        {
            category: "Topics",
            key: "topic",
            subtopics: extractDistinctValues(data, "topic"),
        },
        {
            category: "PEST",
            key: "pestle",
            subtopics: extractDistinctValues(data, "pestle"),
        },
    ];

    const handleItemClick = (index, category) => {
        const foundCategory = topics.find((item) => item.category === category);
        console.log("foundCategory", foundCategory);
        setSubTopics(foundCategory.subtopics);
        if (index === selectedIndex) {
            setShowSubItem(!showSubItem);
        } else {
            setShowSubItem(true);
        }
        setSelectedIndex(index);
        setSelectedKey(foundCategory.key);
    };

    // handle hover function
    const handleItemHover = (index) => {
        setHoveredIndex(index);
    };

    // Handle filter function
    const handleFilterFunc = (choosenValue) => {
        const currFilteredData = data.filter((item) => item[selectedKey] === choosenValue);
        setFilteredData(currFilteredData);

        setSelectedValue(choosenValue);
        setShowItem(false);
        setShowSubItem(false);
    };

    // Capitalize First letter of string
    const capitalizeFirstLetter = (str) => {
        return str.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    };

    return (
        <Box p={10} bg={"black"}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <MantineLogo size={30} />
                    <div style={{ position: "relative" }}>
                        <Button
                            onClick={() => {
                                setShowItem(!showItem);
                                setShowSubItem(false);
                            }}
                        >
                            Filter Data
                        </Button>
                        <div
                            style={{
                                position: "absolute",
                                left: "110px",
                                top: "0px",
                                gap: "10px",
                                width: "350px",
                            }}
                        >
                            {selectedKey && (
                                <Text size="xs" align="left">
                                    {capitalizeFirstLetter(selectedKey)}
                                    {" >"}
                                </Text>
                            )}
                            {selectedValue && (
                                <Text size="xs" align="left">
                                    {selectedValue}
                                </Text>
                            )}
                        </div>

                        {showItem && (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "absolute",
                                    width: "100px",
                                    background: "white",
                                    top: "110%",
                                    borderRadius: "4px",
                                    padding: "4px",
                                    boxSizing: "border-box",
                                    zIndex: "9999",
                                }}
                            >
                                {topics.map((item, index) => (
                                    <Text
                                        key={index}
                                        className="filterBtn"
                                        style={{
                                            cursor: "pointer",
                                            color: "black",
                                            padding: "3px 10px",
                                            width: "100%",
                                            borderRadius: "4px",
                                            backgroundColor:
                                                selectedIndex === index
                                                    ? "rgb(94 206 229)"
                                                    : hoveredIndex === index
                                                    ? "rgb(194 226 255)"
                                                    : "transparent",
                                        }}
                                        onClick={() => handleItemClick(index, item.category)}
                                        onMouseEnter={() => handleItemHover(index)}
                                        onMouseLeave={() => handleItemHover(null)}
                                    >
                                        {item.category}
                                    </Text>
                                ))}
                            </div>
                        )}
                        {showSubItem && (
                            <div
                                style={{
                                    position: "absolute",
                                    width: "250px",
                                    right: "-250px",
                                    background: "white",
                                    top: "110%",
                                    borderRadius: "4px",
                                    padding: "4px",
                                    boxSizing: "border-box",
                                    maxHeight: "90vh",
                                    overflowY: "auto",
                                    zIndex: "9999",
                                }}
                            >
                                {Array.isArray(subTopics) &&
                                    subTopics.length > 0 &&
                                    subTopics.map((item, index) => (
                                        <Text
                                            key={index}
                                            className="filterBtn"
                                            style={{
                                                cursor: "pointer",
                                                color: "black",
                                                padding: "3px 10px",
                                                width: "100%",
                                                borderRadius: "4px",
                                            }}
                                            onClick={(e) => {
                                                handleFilterFunc(e.target.innerHTML);
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    ))}
                            </div>
                        )}
                    </div>

                    <Menu shadow="md" width={200} position="bottom-start" offset={10}>
                        <Menu.Target>
                            <Group>
                                <Group visibleFrom="sm">
                                    {<IconChevronLeft size="1rem" style={{ cursor: "pointer" }} />}
                                    <div style={{ flex: 1, display: { sm: "none" } }}>
                                        <Text size="sm" fw={500} align="right">
                                            Subha Biswal
                                        </Text>

                                        <Text c="dimmed" size="xs" align="right">
                                            subhabiswal100@gmail.com
                                        </Text>
                                    </div>
                                </Group>
                                <Avatar
                                    src="https://images.squarespace-cdn.com/content/v1/5e6ece70bd2f8a6de8472818/714f685e-d0ba-40f9-8bb2-38722c1fd29c/Tiny+Avatar.png"
                                    radius="xl"
                                    style={{ cursor: "pointer" }}
                                />
                            </Group>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Application</Menu.Label>
                            <Menu.Item
                                leftSection={
                                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                                }
                            >
                                Settings
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconMessageCircle
                                        style={{ width: rem(14), height: rem(14) }}
                                    />
                                }
                            >
                                Messages
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconPhoto style={{ width: rem(14), height: rem(14) }} />
                                }
                            >
                                Gallery
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconSearch style={{ width: rem(14), height: rem(14) }} />
                                }
                                rightSection={
                                    <Text size="xs" c="dimmed">
                                        ⌘K
                                    </Text>
                                }
                            >
                                Search
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item
                                leftSection={
                                    <IconArrowsLeftRight
                                        style={{ width: rem(14), height: rem(14) }}
                                    />
                                }
                            >
                                Transfer my data
                            </Menu.Item>
                            <Menu.Item
                                color="red"
                                leftSection={
                                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                                }
                            >
                                Delete my account
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </header>
        </Box>
    );
}
