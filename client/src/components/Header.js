import {
    Group,
    UnstyledButton,
    Text,
    ThemeIcon,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineTheme,
    Avatar,
    Menu,
    Select,
    Button,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
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

export function Header() {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [data, setData] = useState([]);
    const [showItem, setShowItem] = useState(false);
    const [showSubItem, setShowSubItem] = useState(false);
    const [subTopics, setSubTopics] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const getData = () => {
            axios.get(`${BACKEND_URL}/data`).then(({ data }) => {
                data = data.slice(0, 50);
                console.log("data", data);
                setData(data);
            });
        };
        getData();
    }, []);

    // Function to extract distinct values from an array of objects based on a specified key
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

    // Organize the result in the specified format
    const topics = [
        {
            category: "Countries",
            subtopics: extractDistinctValues(data, "country"),
        },
        {
            category: "End Years",
            subtopics: extractDistinctValues(data, "end_year"),
        },
        {
            category: "Source",
            subtopics: extractDistinctValues(data, "source"),
        },
        {
            category: "Region ",
            subtopics: extractDistinctValues(data, "region"),
        },
        {
            category: "Sector",
            subtopics: extractDistinctValues(data, "sector"),
        },
        {
            category: "Topics",
            subtopics: extractDistinctValues(data, "topic"),
        },
        {
            category: "PEST",
            subtopics: extractDistinctValues(data, "pestle"),
        },
    ];

    console.log("topics", topics);

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
    };
    console.log();

    const handleItemHover = (index) => {
        setHoveredIndex(index); // Set the hovered index
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
                            Filter
                        </Button>
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
                                                    ? "#dbdbdb"
                                                    : hoveredIndex === index
                                                    ? "#f1eded96"
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
                                    right: "-283px",
                                    background: "white",
                                    top: "110%",
                                    borderRadius: "4px",
                                    padding: "4px",
                                    boxSizing: "border-box",
                                    maxHeight: "90vh",
                                    overflowY: "auto",
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
