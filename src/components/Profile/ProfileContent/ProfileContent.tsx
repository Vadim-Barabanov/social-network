import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MyPosts from "../MyPosts/MyPosts";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ backgroundColor: "#212121" }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#212121",
    },
}));

export const ProfileContent = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                style={{
                    backgroundColor: "#212121",
                    boxShadow: "none",
                    borderBottom: "1px solid #333",
                }}>
                <Tabs
                    centered
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    <Tab label="Posts" {...a11yProps(0)} />
                    <Tab label="Projects" {...a11yProps(1)} />
                    <Tab label="Gallery" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MyPosts />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Proj1, Proj2, Proj3
            </TabPanel>
            <TabPanel value={value} index={2}>
                Photo1, Photo2, Photo3
            </TabPanel>
        </div>
    );
};
