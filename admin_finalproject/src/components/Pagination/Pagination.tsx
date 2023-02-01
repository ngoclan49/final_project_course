import { Table, TableBody, TablePagination, TableRow } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { LocationModel } from '../../Models/LocationModel';
import { RoomModel } from '../../Models/RoomModel';
import { UserModel } from '../../Models/UserModel';
import { AppDispatch } from '../../redux/configStore';

type Props = {
    data: RoomModel[] | LocationModel[] | UserModel[],
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    rowsPerPage: number,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination = ({ data, page, setPage, rowsPerPage, setRowsPerPage}: Props) => {
   
    // xử lý thay đổi trang
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    // xử lý hiển thị trang theo cột
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

   
    return (
        <Table className='pagination'>
        <TableBody>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length - 1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableBody>
      </Table>
    )
}

export default Pagination