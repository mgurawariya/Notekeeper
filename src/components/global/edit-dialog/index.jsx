import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useForm, Controller } from "react-hook-form";

import editDialogStyle from './styles';

function EditNotes(props) {
    const { dialogStatus, dialogOpenClose, dialogContent, updateNotes } = props;
    const classes = editDialogStyle();
    const { control, handleSubmit, reset  } = useForm({
        reValidateMode: "onBlur"
    });

    const [open, setOpen] = useState(dialogStatus);
    useEffect(() => {
        reset()
        setOpen(dialogStatus);
    }, [dialogStatus]);

    const handleOnSubmit = (evt) => {
        const newData = {
            ...dialogContent,
            ...evt
        }
        updateNotes( newData );
        dialogOpenClose( false );
    }

    const myHelper = {
        title: {
            required: "Title is Required"
        },
        tagline: {
            required: "Tagline is Required"
        },
        body: {
            required: "Body is Required",
            pattern: 'Please enter more than 1 characters'
        }
    }

    return (
        <>
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={'md'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Edit Notes</DialogTitle>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                    <DialogContent classes={{ root: classes.dialogContent }}>

                        <Typography component="div">
                            <Controller
                                control={control}
                                name="title"
                                defaultValue={dialogContent.title}
                                rules={{
                                    required: true
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Title"
                                        error={error !== undefined}
                                        helperText={error ? myHelper.title[error.type] : ""}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="tagline"
                                defaultValue={ dialogContent.tagline }
                                rules={{
                                    required: true
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Tagline"
                                        error={error !== undefined}
                                        helperText={error ? myHelper.tagline[error.type] : ""}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="body"
                                defaultValue={ dialogContent.body }
                                rules={{
                                    required: true,
                                    minLength: 1
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        multiline={ true }
                                        rows={ 5 }
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Body"
                                        error={error !== undefined}
                                        helperText={error ? myHelper.body[error.type] : ""}
                                    />
                                )}
                            />
                        </Typography>

                    </DialogContent>

                    <DialogActions classes={{ root: classes.footerBtn }}>
                        <Button variant="outlined" fullWidth={true} onClick={() => dialogOpenClose(false)}>
                            CANCEL
                        </Button>
                        <Button variant="contained" color="primary" fullWidth={true} type="submit">
                            SAVE
                        </Button>
                    </DialogActions>

                </Box>
            </Dialog>
        </>
    )

}

export default EditNotes;