"use client";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { categoryAsyncAction } from "@/store/category/action";
import { useAppDispatch } from "@/store/store";
import { userAsyncAction } from "@/store/user/action";
import { isGettingUsersSelector, usersSelector } from "@/store/user/selector";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const Page = (props: Props) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  const dispatch = useAppDispatch();

  const users = useSelector(usersSelector);
  const isGettingUsers = useSelector(isGettingUsersSelector);

  const handlePageChange = (e: unknown, page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  useEffect(() => {
    dispatch(userAsyncAction.getAll());
    dispatch(categoryAsyncAction.getAll());
  }, []);

  return (
    <div className="py-10 px-14">
      {isGettingUsers ? (
        <TableSkeleton length={10} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">PhoneNum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, rowsPerPage * (page + 1))
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell align="center">{user.id}</TableCell>
                        <TableCell align="center">{user.name}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.phoneNum}</TableCell>
                      </TableRow>
                    )) || []}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              rowsPerPage={rowsPerPage}
              component="div"
              onRowsPerPageChange={handleRowsPerPageChange}
              count={users.length}
              onPageChange={handlePageChange}
              page={page}
            />
          </Paper>
        </Box>
      )}
    </div>
  );
};

export default Page;
