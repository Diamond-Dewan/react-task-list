import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from "react-swipeable-views";
import { useTheme } from '@material-ui/core/styles';
import {Tabs, Tab} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {WorkRounded, WorkOffRounded} from "@material-ui/icons";

import TaskList from "./TaskList";
import AddTask from "./AddTask";
import {TodoListContext} from "../context/TodoListContext";
import Paper from "@material-ui/core/Paper";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function TabSwitch() {
    const {tasks} = useContext(TodoListContext);
    const completedTask = tasks.filter(task=>task.done === true);
    const inCompletedTask = tasks.filter(task=>task.done !== true);

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <Box boxShadow={1}>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                >
                    <Tab icon={<WorkRounded/>} {...a11yProps(0)} />
                    <Tab icon={<WorkOffRounded/>} {...a11yProps(1)} />
                </Tabs>
            </Paper>

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <TaskList tasks={inCompletedTask} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <TaskList tasks={completedTask}/>
                </TabPanel>
            </SwipeableViews>

            {/* add task */}
            <AddTask/>
            {/* add task*/}
        </Box>
    );
}
