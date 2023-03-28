import React, { useContext, useState, useMemo } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { DataContext } from '../../context/DataProvider';
import { paginationValue, reorder } from '../../utils/common-utils';

//components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';
import PaginationForNotes from '../global/pagination';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {

    const { notes, setNotes } = useContext(DataContext);
    const [page, setPage] = useState(1);


    const onDragEnd = (result) => {
        if (!result.destination)
            return;

        const items = reorder(notes, result.source.index, result.destination.index);
        setNotes(items);
    }

    const pageChange = (event, value) => {
        setPage(value);
    }

    const { paginatedNotesList, pinnedNotesList } = useMemo(() => {
        let unpinned = [];
        let pinned = [];

        notes.forEach((element, index) => {
            if( element.pinned ) {
                pinned.push( {...element, orgIndex: index } );
            } else {
                unpinned.push( {...element, orgIndex: index } );
            }
        });
        
        return {
            paginatedNotesList: paginationValue(unpinned, page),
            pinnedNotesList: pinned
        }

    }, [page, notes]);

    

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />

                {
                    pinnedNotesList.length > 0 &&
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <Grid container style={{ marginTop: 16 }}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            pinnedNotesList.map((note, index) => (
                                                <Draggable key={note.id} draggableId={note.id} index={note.orgIndex}>
                                                    {(provided, snapshot) => (
                                                        <Grid ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            item
                                                        >
                                                            <Note note={note} index={note.orgIndex} />
                                                        </Grid>
                                                    )}
                                                </Draggable >
                                            ))
                                        }
                                    </Grid>
                                )}
                            </Droppable >
                        </DragDropContext>
                }

                {paginatedNotesList.length > 0 ?
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <Grid container style={{ marginTop: 16 }}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {
                                        paginatedNotesList.map((note, index) => (
                                            <Draggable key={note.id} draggableId={note.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <Grid ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        item
                                                    >
                                                        <Note note={note} index={note.orgIndex} />
                                                    </Grid>
                                                )}
                                            </Draggable >
                                        ))
                                    }
                                </Grid>
                            )}
                        </Droppable >
                    </DragDropContext>
                    : <EmptyNotes />}
                <PaginationForNotes count={notes.length} page={page} pageChange={pageChange} />
            </Box>
        </Box>
    )
}

export default Notes;