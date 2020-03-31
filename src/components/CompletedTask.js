import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {Clear, Edit, SendTwoTone, FavoriteBorder, Favorite} from "@material-ui/icons";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import {TodoListContext} from "../context/TodoListContext";

function CompletedTask(props) {
    const { task } = props;
    const { updateTask, removeTask } = useContext(TodoListContext);

    // create current task state
    const [currentTask, setCurrentTask] = useState({
        id: task.id,
        title: task.title,
        done: task.done
    });

    // popUp form operations
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask(currentTask);       // add to state
        handleClose();      // close form
    };

    return (
        <Box borderRadius="borderRadius" boxShadow={2} my={1}>
            <ListItem>
                <ListItemText primary={<del>{task.title}</del>} />
                <ListItemSecondaryAction>
                    <IconButton onClick={handleClickOpen} size={"small"} edge="end" aria-label="more" aria-controls="menu" style={{marginRight: '0.5em'}}>
                        <Edit fontSize={"small"} color={"primary"}/>
                    </IconButton>
                    <IconButton onClick={() => removeTask(task.id)} size={"small"} edge="end" aria-label="more" aria-controls="menu">
                        <Clear fontSize="default" color={"secondary"}/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <Dialog open={open} maxWidth={"sm"} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Editing: `{task.title}`</DialogTitle>
                <DialogContent>
                    {/* Task form */}
                    <FormControl size={"medium"} margin={"normal"} disabled fullWidth>
                        <Input value={currentTask.id}/>
                    </FormControl>

                    <FormControl onKeyPress={(e) => e.key === "Enter" ? handleFormSubmit(e) : false } size={"medium"} margin={"normal"} fullWidth>
                        <Input autoFocus value={currentTask.title} onChange={e => setCurrentTask({...currentTask, title: e.target.value})} type='text' placeholder="Add New Task"/>
                    </FormControl>

                    <FormControlLabel
                        label="Done"
                        control={ <Checkbox checked={currentTask.done} onChange={e => setCurrentTask({...currentTask, done: e.target.checked})} icon={<FavoriteBorder />}
                                            checkedIcon={<Favorite />}
                        />}
                    />
                    {/*Task Form ends*/}
                </DialogContent>
                <DialogActions display={'flex'}>
                    <Button float={'left'} onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFormSubmit} color="primary" endIcon={<SendTwoTone/>}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

CompletedTask.prototype = {
    task: PropTypes.object.isRequired
};

export default CompletedTask;