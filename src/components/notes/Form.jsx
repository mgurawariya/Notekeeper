import { useState, useRef, useContext } from 'react';

import { Box, TextField, ClickAwayListener } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { ToastContainer } from 'react-toastify';

import { DataContext } from '../../context/DataProvider';
import { notify } from '../../utils/common-utils';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`

const note = {
    id: '',
    title: '',
    tagline: '',
    body: '',
    pinned: false
}

const Form = () => {

    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({ ...note, id: uuid() });

    const { setNotes } = useContext(DataContext);

    const containerRef = useRef();

    const handleClickAway = () => {
        setShowTextField(false);
    }

    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value };
        setAddNote(changedNote);
    }

    const addNewNotes = () => {
        if (addNote.title && addNote.tagline && addNote.body) {

            setShowTextField(false);
            containerRef.current.style.minheight = '30px';
            setAddNote({ ...note, id: uuid() });
            setNotes(prevArr => [addNote, ...prevArr]);
            notify( 'success', 'notes created successfully' );

        } else {
            notify( 'warn', 'Please fill all the details to create note' );
        }
    }

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Container ref={containerRef}>
                    {showTextField ?
                        <>
                            <TextField
                                placeholder="Title"
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                style={{ marginBottom: 10 }}
                                onChange={(e) => onTextChange(e)}
                                name='title'
                                value={addNote.title}
                            />
                            <TextField
                                placeholder="Tagline"
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                style={{ marginBottom: 10 }}
                                onChange={(e) => onTextChange(e)}
                                name='tagline'
                                value={addNote.tagline}
                            />
                            <TextField
                                placeholder="Body"
                                multiline
                                maxRows={Infinity}
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => onTextChange(e)}
                                name='body'
                                value={addNote.body}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Button variant="contained" onClick={addNewNotes}>Add New</Button>
                            </div>
                        </>
                        :
                        <TextField
                            placeholder="Add new notes"
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            onClick={onTextAreaClick}
                            value=""
                        />
                    }
                </Container>
            </ClickAwayListener>
            <ToastContainer />
        </>
    )
}

export default Form;