import { useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';
import NotesCard from 'components/global/notes-card';
import { notify } from 'utils/common-utils';

const Archive = ({ archive, index }) => {

    const { archiveNotes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);

    const unArchiveNote = (archive) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        notify( 'success', 'notes un-archived successfully' );
        setAcrchiveNotes(updatedNotes);
        setNotes(prevArr => [archive, ...prevArr]);
       
    }

    const deleteNote = (archive) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        setAcrchiveNotes(updatedNotes);
        setDeleteNotes(prevArr => [archive, ...prevArr]);
        notify( 'success', 'notes deleted successfully' );
    }

    const updateNotes = ( note ) => {        
        let newNotes = [...archiveNotes];
        newNotes[ index ] = note;
        setAcrchiveNotes(newNotes);
        notify( 'success', 'notes updated successfully' );
    }

    const actionButtonPrimary = () => {
        return (
            <Tooltip title="Un-Archive your note" placement="top-start">
                <Unarchive
                    fontSize="small"
                    style={{ marginLeft: 'auto', color: 'blue', cursor: 'pointer' }}
                    onClick={() => unArchiveNote(archive)}
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
                    onClick={() => deleteNote(archive)}
                />
            </Tooltip>
        )
    }

    return (
        <>
            <NotesCard note={ archive } actionButtonPrimary={ actionButtonPrimary } actionButtonSecondary={ actionButtonSecondary } updateNotes={ updateNotes } type="ARCHIVE" />
        </>
    )
}

export default Archive;