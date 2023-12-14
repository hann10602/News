"use client";
import DeleteModal from "@/components/Modal/DeleteModal/DeleteModal";
import NewsModal from "@/components/Modal/NewsModal/NewsModal";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { categoryAsyncAction } from "@/store/category/action";
import { newsAsyncAction } from "@/store/news/action";
import {
  isGettingNewsListSelector,
  newsListSelector,
} from "@/store/news/selector";
import { NewsType } from "@/store/news/type";
import { useAppDispatch } from "@/store/store";
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
  const [news, setNews] = useState<NewsType | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [isEditPageOpen, setIsEditPageOpen] = useState<boolean>(false);
  const [isDeletePageOpen, setIsDeletePageOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const newsList = useSelector(newsListSelector);
  const isGettingNewsList = useSelector(isGettingNewsListSelector);

  const handlePageChange = (e: unknown, page: number) => {
    setPage(page);
  };

  const handleClosePage = () => {
    setIsEditPageOpen(false);
    setIsDeletePageOpen(false);
    setNews(undefined);
  };

  const handleSuccessfully = () => {
    dispatch(newsAsyncAction.getAll());
    setIsEditPageOpen(false);
    setNews(undefined);
    successNotify("Success");
  };

  const handleDeleteNews = () => {
    if (news) {
      dispatch(newsAsyncAction.deletes({ id: news.id }))
        .then(() => {
          dispatch(newsAsyncAction.getAll());
          setIsDeletePageOpen(false);
          setNews(undefined);
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
    dispatch(newsAsyncAction.getAll());
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
      {isGettingNewsList ? (
        <TableSkeleton length={10} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Created Date</TableCell>
                    <TableCell align="center" className="w-48">
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newsList
                    .slice(page * rowsPerPage, rowsPerPage * (page + 1))
                    .map((news) => (
                      <TableRow key={news.id}>
                        <TableCell align="center">{news.id}</TableCell>
                        <TableCell align="center">{news.title}</TableCell>
                        <TableCell align="center">{news.category}</TableCell>
                        <TableCell align="center">{news.createdDate}</TableCell>
                        <TableCell
                          align="center"
                          className="w-48 flex items-center justify-center space-x-2"
                        >
                          <Button
                            variant="contained"
                            className="w-16 bg-green-400 hover:bg-green-300"
                            onClick={() => {
                              setNews(news);
                              setIsEditPageOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            className="w-16 bg-red-400 hover:bg-red-300"
                            onClick={() => {
                              setNews(news);
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
              count={newsList.length}
              onPageChange={handlePageChange}
              page={page}
            />
          </Paper>
        </Box>
      )}
      <NewsModal
        item={news}
        isOpen={isEditPageOpen}
        onClose={handleClosePage}
        onSuccess={handleSuccessfully}
      />
      {news && (
        <DeleteModal
          title={`Are you sure to delete this news ?`}
          isOpen={isDeletePageOpen}
          onClose={handleClosePage}
          handleDelete={handleDeleteNews}
        />
      )}
    </div>
  );
};

export default Page;
