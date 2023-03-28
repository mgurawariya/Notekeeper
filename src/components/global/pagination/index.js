import React from 'react';
import Pagination from '@mui/material/Pagination';

function PaginationForNotes ( props ) {
    const { count, page, pageChange } = props;
    const perPage = 6;

    return (
        <div style={{ position: 'fixed', right: '20px', bottom: '20px' }}>
            <Pagination variant="outlined" color="primary" count={ Math.floor(count/perPage) + 1 } page={page} onChange={pageChange} />
        </div>
    )
}

export default PaginationForNotes;