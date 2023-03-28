import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete, Edit, StarBorder } from '@mui/icons-material';
import EditNotes from '../edit-dialog';


const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 390px;
    margin: 8px;
    box-shadow: none;
`

function NotesCard ( props ) {

    const { note, updateNotes, pinNotes, actionButtonPrimary, actionButtonSecondary, type } = props;
    const [editStatus, setEditStatus] = useState( false );

    const toggleDialog = ( status ) => {
        setEditStatus( status );
    }

    const pinYourNotes = () => {
        const updatedData = {
            ...note,
            pinned: !note.pinned
        }
        pinNotes( updatedData );
    }

    return (
        <>
            <StyledCard>                
                <CardContent>
                    <div style={{ position: 'relative' }}>
                        { type === 'NOTE' && <StarBorder
                            fontSize="small"
                            style={{ marginLeft: 'auto', color: `${ note.pinned ? 'red' : '' }`, cursor: 'pointer', position: 'absolute', right: '10px' }}
                            onClick={ pinYourNotes }
                        /> }
                        <Typography variant='h4'>{note.title}</Typography>
                        <Typography variant='h6'>{note.tagline}</Typography>
                        <Typography variant='subtitle1'>{note.body}</Typography>
                    </div>
                </CardContent>
                <CardActions>

                    { actionButtonPrimary() }
                    
                    { type !== "TRASH" &&
                        <Tooltip title="Edit your note" placement="top-start">
                            <Edit
                                fontSize="small"
                                style={{ color: 'green', cursor: 'pointer' }}
                                onClick={() => toggleDialog(true)}
                            />
                        </Tooltip>
                    }

                    { actionButtonSecondary() }

                </CardActions>
            </StyledCard>

            <EditNotes dialogStatus={editStatus} dialogOpenClose={toggleDialog} dialogContent={note} updateNotes={updateNotes} />
        </>
    )
}

export default NotesCard;