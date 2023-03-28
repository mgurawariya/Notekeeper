import { useContext, useState, useMemo } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import Archive from './Archive';
import PaginationForNotes from 'components/global/pagination';
import { paginationValue } from 'utils/common-utils';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Archives = () => {

    const { archiveNotes } = useContext(DataContext);

    const [page, setPage] = useState(1);
    const pageChange = (event, value) => {
        setPage(value);
    }
    const paginatedNotes = useMemo(() => {
        return paginationValue(archiveNotes, page);
    }, [page, archiveNotes])

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Grid container>
                    {
                        paginatedNotes.map((archive, index) => (
                            <Grid item key={ index }>
                                <Archive archive={archive} index={ index } />
                            </Grid>
                        ))
                    }
                    { archiveNotes.length === 0 && <Typography variant='h6'>No records found</Typography> }
                </Grid>
                <PaginationForNotes count={archiveNotes.length} page={page} pageChange={pageChange} />
            </Box>
        </Box>
    )
}

export default Archives;