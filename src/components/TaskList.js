import React from 'react';
import Task from "./Task";
import CompletedTask from "./CompletedTask";

import PropTypes from 'prop-types';
import List from "@material-ui/core/List";
import Zoom from "@material-ui/core/Zoom";


function TaskList({tasks}) {
    return (
        <List>
            {tasks.map(task =>(
                task.done ? <Zoom in={true}><CompletedTask key={task.id} task={task}/></Zoom> : <Zoom in={true}><Task key={task.id} task={task}/></Zoom>
                ))
            }
        </List>
    );
}

TaskList.prototype = {
    tasks: PropTypes.array.isRequired
};

export default TaskList;