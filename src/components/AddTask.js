import React, {useState, useContext} from 'react';
import {TodoListContext} from "../context/TodoListContext";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {Add, SendTwoTone} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    }
}));

function AddTask() {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { addTask } = useContext(TodoListContext);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: Math.floor(Math.random()*100000000),
            title: value,
            done: false,
        };
        addTask(newTask);       // add to state
        setValue('');       // reset to initial
        handleClose();      // close form
    };

    return (
        <React.Fragment>
            <AppBar onClick={handleClickOpen} position="relative" color="primary" className={classes.appBar}>
                <Tooltip title={'Add Task'}>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                        <Add />
                    </Fab>
                </Tooltip>
            </AppBar>

            <Dialog open={open} maxWidth={"sm"} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
                <DialogContent>
                    {/* Task form */}
                    <FormControl onKeyPress={(e) => e.key === "Enter" ? handleFormSubmit(e) : false } size={"medium"} margin={"normal"} fullWidth>
                        <Input autoFocus value={value} onChange={event => setValue(event.target.value)} type='text' placeholder="Add New Task"/>
                    </FormControl>
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
        </React.Fragment>
    );
}

export default AddTask;