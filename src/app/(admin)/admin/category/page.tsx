"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  categoriesSelector,
  isGettingCategoriesSelector,
} from "@/store/category/selector";

type Props = {};

const Page = (props: Props) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);

  const categories = useSelector(categoriesSelector);
  const isGettingCategories = useSelector(isGettingCategoriesSelector);

  const handlePageChange = (e: unknown, page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell align="center">{category.id}</TableCell>
                  <TableCell align="center">{category.name}</TableCell>
                  <TableCell align="center">{category.code}</TableCell>
                </TableRow>
              )) || []}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          count={25}
          onPageChange={handlePageChange}
          page={page}
        />
      </Paper>
    </Box>
  );
};

export default Page;
