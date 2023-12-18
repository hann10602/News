"use client";
import DeleteModal from "@/components/Modal/DeleteModal/DeleteModal";
import UserModal from "@/components/Modal/UserModal/UserModal";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { categoryAsyncAction } from "@/store/category/action";
import { newsAsyncAction } from "@/store/news/action";
import { useAppDispatch } from "@/store/store";
import { userAsyncAction } from "@/store/user/action";
import { isGettingUsersSelector, usersSelector } from "@/store/user/selector";
import { UserType } from "@/store/user/type";
import { failedNotify, successNotify } from "@/utils/utils";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const Page = (props: Props) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [isEditPageOpen, setIsEditPageOpen] = useState<boolean>(false);
  const [isDeletePageOpen, setIsDeletePageOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const users = useSelector(usersSelector);
  const isGettingUsers = useSelector(isGettingUsersSelector);

  const handlePageChange = (e: unknown, page: number) => {
    setPage(page);
  };

  const handleClosePage = () => {
    setIsEditPageOpen(false);
    setIsDeletePageOpen(false);
    setUser(undefined);
  };

  const handleSuccessfully = () => {
    dispatch(userAsyncAction.getAll());
    setIsEditPageOpen(false);
    setUser(undefined);
    successNotify("Success");
  };

  const handleDeleteUser = () => {
    if (user) {
      dispatch(userAsyncAction.deletes({ id: user.id }))
        .then(() => {
          dispatch(newsAsyncAction.getAll());
          setIsDeletePageOpen(false);
          setUser(undefined);
          successNotify("Success");
        })
        .catch((err) => {
          failedNotify(err.message);
        });
    }
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Button
        className="mb-8 px-10 py-2 bg-[#3d8bd9]"
        variant="contained"
        color="primary"
        onClick={() => setIsEditPageOpen(true)}
      >
        Add
      </Button>
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
                    <TableCell align="center" className="w-48">
                      Options
                    </TableCell>
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
                        <TableCell
                          align="center"
                          className="w-48 flex items-center justify-center space-x-2"
                        >
                          <Button
                            variant="contained"
                            className="w-16 bg-green-400 hover:bg-green-300"
                            onClick={() => {
                              setUser(user);
                              setIsEditPageOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            className="w-16 bg-red-400 hover:bg-red-300"
                            onClick={() => {
                              setUser(user);
                              setIsDeletePageOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
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
      <UserModal
        item={user}
        isOpen={isEditPageOpen}
        onClose={handleClosePage}
        onSuccess={handleSuccessfully}
      />
      {user && (
        <DeleteModal
          title={`Are you sure to delete this user ?`}
          isOpen={isDeletePageOpen}
          onClose={handleClosePage}
          handleDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default Page;
