"use client";
import CategoryModal from "@/components/Modal/CategoryModal/CategoryModal";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { categoryAsyncAction } from "@/store/category/action";
import {
  categoriesSelector,
  isGettingCategoriesSelector,
} from "@/store/category/selector";
import { CategoryType } from "@/store/category/type";
import { useAppDispatch } from "@/store/store";
import { successNotify } from "@/utils/utils";
import {
  Box,
  Button,
  Modal,
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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

type Props = {};

const Page = (props: Props) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [category, setCategory] = useState<CategoryType | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [isEditPageOpen, setIsEditPageOpen] = useState<boolean>(false);
  const [isDeletePageOpen, setIsDeletePageOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const categories = useSelector(categoriesSelector);
  const isGettingCategories = useSelector(isGettingCategoriesSelector);

  const handlePageChange = (e: unknown, page: number) => {
    setPage(page);
  };

  const handleCloseEditPage = () => {
    setIsEditPageOpen(false);
    setCategory(undefined);
  };

  const handleSuccessfully = () => {
    dispatch(categoryAsyncAction.getAll());
    setIsEditPageOpen(false);
    setCategory(undefined);
    successNotify("Success");
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  useEffect(() => {
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
      {isGettingCategories ? (
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
                    <TableCell align="center">Code</TableCell>
                    <TableCell align="center">Product quantity</TableCell>
                    <TableCell align="center" className="w-48">
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories
                    .slice(page * rowsPerPage, rowsPerPage * (page + 1))
                    .map((category) => (
                      <TableRow key={category.id}>
                        <TableCell align="center">{category.id}</TableCell>
                        <TableCell align="center">{category.name}</TableCell>
                        <TableCell align="center">{category.code}</TableCell>
                        <TableCell align="center">{category.name}</TableCell>
                        <TableCell
                          align="center"
                          className="w-48 flex items-center justify-center space-x-2"
                        >
                          <Button
                            variant="contained"
                            className="w-16 bg-green-400 hover:bg-green-300"
                            onClick={() => {
                              setCategory(category);
                              setIsEditPageOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            className="w-16 bg-red-400 hover:bg-red-300"
                            onClick={
                              () => dispatch
                              // dispatch(categoryAsyncAction.delete())
                            }
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
              count={categories.length}
              onPageChange={handlePageChange}
              page={page}
            />
          </Paper>
        </Box>
      )}
      <CategoryModal
        item={category}
        isOpen={isEditPageOpen}
        onClose={handleCloseEditPage}
        onSuccess={handleSuccessfully}
      />
      {isDeletePageOpen && (
        <Modal open={isDeletePageOpen}>
          <div></div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
