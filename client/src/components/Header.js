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
import { useState } from "react";

export function Header() {
    const topicsData = [
        {
            label: "Frontend Frameworks",
            options: ["React", "Angular", "Vue", "Svelte"],
        },
        {
            label: "Backend Frameworks",
            options: ["Express.js", "Django", "Spring Boot", "Laravel"],
        },
        {
            label: "Programming Languages",
            options: ["JavaScript", "Python", "Java", "PHP"],
        },
    ];

    const [selectedTopics, setSelectedTopics] = useState([]);

    // Handle change function to update selected topics
    const handleChange = (values) => {
        setSelectedTopics(values);
    };

    // Flatten topicsData to prepare for use in Select component
    const flattenedOptions = topicsData.flatMap((topic) =>
        topic.options.map((option) => ({
            label: `${topic.label} - ${option}`, // Combine topic label and option
            value: option.toLowerCase().replace(/\s+/g, "-"), // Format value (e.g., "react")
        }))
    );

    return (
        <Box p={10} bg={"black"}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <MantineLogo size={30} />
                    <Menu>
                        <Menu.Target>
                            <Button>Filter</Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Menu>
                                    <Menu.Target>
                                        <Text>Fruits</Text>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item>Apples</Menu.Item>
                                        <Menu.Item>Oranges</Menu.Item>
                                        <Menu.Item>Bananas</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Menu.Item>
                            <Menu.Item>
                                <Menu>
                                    <Menu.Target>
                                        <Text>Vegetables</Text>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item>Tomatoes</Menu.Item>
                                        <Menu.Item>Carrots</Menu.Item>
                                        <Menu.Item>Lettuce</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Menu.Item>
                            <Menu.Item>
                                <Menu>
                                    <Menu.Target>
                                        <Text>Animals</Text>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item>Mammals</Menu.Item>
                                        <Menu.Item>Birds</Menu.Item>
                                        <Menu.Item>Reptiles</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

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
