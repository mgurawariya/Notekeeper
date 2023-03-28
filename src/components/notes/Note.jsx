import { useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete, Edit } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';
import NotesCard from 'components/global/notes-card';
import { notify } from 'utils/common-utils';

const Note = ({ note, index }) => {

    const { notes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);

    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setAcrchiveNotes(prevArr => [note, ...prevArr]);
        notify( 'success', 'notes archived successfully' );
    }

    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setDeleteNotes(prevArr => [note, ...prevArr]);
        notify( 'success', 'notes deleted successfully' );
    }

    const updateNotes = ( note ) => {        
        let newNotes = [...notes];
        newNotes[ index ] = note;
        setNotes(newNotes);
        notify( 'success', 'notes updated successfully' );
    }

    const pinNotes = ( note ) => {        
        let newNotes = [...notes];
        newNotes[ index ] = note;
        setNotes(newNotes);
        notify( 'success', `notes ${ note.pinned ? 'pinned' : 'unpinned' } successfully` );
    }

    const actionButtonPrimary = () => {
        return (
            <Tooltip title="Archive your note" placement="top-start">
                <Archive
                    fontSize="small"
                    style={{ marginLeft: 'auto', color: 'blue', cursor: 'pointer' }}
                    onClick={() => archiveNote(note)}
                />
            </Tooltip>
        )
    }

    const actionButtonSecondary = () => {
        return (
            <Tooltip title="Delete your note" placement="top-start">
                <Delete
                    fontSize="small"
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => deleteNote(note)}
                />
            </Tooltip>
        )
    }
    
    return (
        <>
            <NotesCard note={ note } actionButtonPrimary={ actionButtonPrimary } actionButtonSecondary={ actionButtonSecondary } updateNotes={ updateNotes } pinNotes={ pinNotes } type="NOTE" />
        </>
    )
}

export default Note;