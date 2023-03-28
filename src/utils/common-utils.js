import { toast } from 'react-toastify';

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

export const notify = ( status, text ) => {
    toast[ status ](text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true
        })
};

export const paginationValue = (array, pageNumber, pageSize = 6) => {
    return array.slice((pageNumber-1) * pageSize, (pageNumber) * pageSize);
}