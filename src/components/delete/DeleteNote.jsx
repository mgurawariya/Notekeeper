import { useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';
import NotesCard from 'components/global/notes-card';
import { notify } from 'utils/common-utils';

const DeleteNote = ({ deleteNote }) => {

    const { deleteNotes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);

    const restoreNote = (deleteNote) => {
        const updatedNotes = deleteNotes.filter(data => data.id !== deleteNote.id);
        setDeleteNotes(updatedNotes);
        setNotes(prevArr => [deleteNote, ...prevArr]);
        notify( 'success', 'notes restored successfully' );
    }

    const removeNote = (deleteNote) => {
        const updatedNotes = deleteNotes.filter(data => data.id !== deleteNote.id);
        setDeleteNotes(updatedNotes);
        notify( 'success', 'notes removed successfully' );
    }

    const actionButtonPrimary = () => {
        return (
            <Tooltip title="Permanently remove your note" placement="top-start">
                <Delete
                    fontSize="small"
                    style={{ marginLeft: 'auto', color: 'red', cursor: 'pointer' }}
                    onClick={() => removeNote(deleteNote)}
                />
            </Tooltip>
        )
    }

    const actionButtonSecondary = () => {
        return (
            <Tooltip title="Restore your note" placement="top-start">
                <Restore
                    fontSize="small"
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => restoreNote(deleteNote)}
                />
            </Tooltip>
        )
    }

    return (
        <>
            <NotesCard note={ deleteNote } actionButtonPrimary={ actionButtonPrimary } actionButtonSecondary={ actionButtonSecondary } type="TRASH" />
        </>
    )
}

export default DeleteNote;