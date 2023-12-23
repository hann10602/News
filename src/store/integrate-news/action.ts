import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetIntegrateNewsType } from "./type";
import axios from "axios";

const getOne = createAsyncThunk(
  "integrate-news/self",
  async (param: GetIntegrateNewsType, { rejectWithValue }) => {
    try {
      return undefined;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getAll = createAsyncThunk(
  "integrate-news/get-all",
  async (param, { rejectWithValue }) => {
    try {
      const data = await axios
        .get(
          "https://newsdata.io/api/1/news?apikey=pub_35134b2e0cb244caf401aae7fe4faf9b91dde&country=vi"
        )
        .then((res) => res.data.results)
        .catch((err) => rejectWithValue(err));

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// const getLimitTen = createAsyncThunk(
//   "news/get-limit-ten",
//   async (param, { rejectWithValue }) => {
//     try {
//       const q = query(newsCollection, limit(10));
//       const data = await getDocs(q)
//         .then((res) =>
//           res.docs.map((doc) => {
//             const category = getDoc(categoryDoc(doc.data().categoryId)).then(
//               (res) => res.data()?.name
//             );

//             return {
//               id: doc.id,
//               category: category,
//               title: doc.data().title,
//               content: doc.data().content,
//               categoryId: doc.data().categoryId,
//               image: doc.data().image,
//               createdDate: format(
//                 doc.data().createdDate.toDate(),
//                 "dd/MM/yyyy"
//               ),
//             };
//           })
//         )
//         .catch((err) => rejectWithValue(err));

//       return data;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// const getByCategory = createAsyncThunk(
//   "news/get-by-category",
//   async (param: GetNewsByCategoryType, { rejectWithValue }) => {
//     try {
//       const q = query(
//         newsCollection,
//         where("categoryId", "==", param.categoryId)
//       );
//       const data = await getDocs(q)
//         .then((res) =>
//           res.docs.map((doc) => {
//             const category = getDoc(categoryDoc(doc.data().categoryId)).then(
//               (res) => res.data()?.name
//             );

//             return {
//               id: doc.id,
//               category: category,
//               title: doc.data().title,
//               content: doc.data().content,
//               categoryId: doc.data().categoryId,
//               image: doc.data().image,
//               createdDate: format(
//                 doc.data().createdDate.toDate(),
//                 "dd/MM/yyyy"
//               ),
//             };
//           })
//         )
//         .catch((err) => rejectWithValue(err));

//       return data;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// const getBySearch = createAsyncThunk(
//   "news/get-by-search",
//   async (param: GetNewsBySearchType, { rejectWithValue }) => {
//     try {
//       const data = await getDocs(newsCollection)
//         .then((res) =>
//           res.docs.map((doc) => {
//             const category = getDoc(categoryDoc(doc.data().categoryId)).then(
//               (res) => res.data()?.name
//             );

//             return {
//               id: doc.id,
//               category: category,
//               title: doc.data().title,
//               content: doc.data().content,
//               categoryId: doc.data().categoryId,
//               image: doc.data().image,
//               createdDate: format(
//                 doc.data().createdDate.toDate(),
//                 "dd/MM/yyyy"
//               ),
//             };
//           })
//         )
//         .catch((err) => rejectWithValue(err));

//       return data;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// const create = createAsyncThunk(
//   "news/create",
//   async (param: CreateNewsType, { rejectWithValue }) => {
//     try {
//       return addDoc(newsCollection, {
//         title: param.title,
//         content: param.content,
//         categoryId: param.categoryId,
//         createdDate: param.createdDate,
//       }).catch(() => rejectWithValue("Add news failed"));
//     } catch (err) {
//       return rejectWithValue("Add news failed");
//     }
//   }
// );

// const update = createAsyncThunk(
//   "news/update",
//   async (param: UpdateNewsType, { rejectWithValue }) => {
//     try {
//       return updateDoc(newsDoc(param.id), {
//         title: param.title,
//         content: param.content,
//         categoryId: param.categoryId,
//         createdDate: param.createdDate,
//       }).catch(() => rejectWithValue("Update news failed"));
//     } catch (err) {
//       return rejectWithValue("Update news failed");
//     }
//   }
// );

// const deletes = createAsyncThunk(
//   "news/delete",
//   async (param: DeleteNewsType, { rejectWithValue }) => {
//     try {
//       return deleteDoc(newsDoc(param.id)).catch(() =>
//         rejectWithValue("Delete news failed")
//       );
//     } catch (err) {
//       return rejectWithValue("Delete news failed");
//     }
//   }
// );

export const integrateNewsAsyncAction = {
  getOne,
  getAll,
};
