import React from "react";
import Layout from "../Navbar_Block/Layout";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import { Resetpassword } from "../Pages/Resetpassword";
import ProfileContainer from "../userprofile/ProfileContainer";
import MyAccount from "../userprofile/sidebarpages/MyAccount";
import AddProfile from "../userprofile/sidebarpages/AddProfile";
import AddPhoto from "../userprofile/sidebarpages/AddPhoto";
import AdminContainer from "../Admin/AdminContainer";
import CreateAlbumn from "../Admin/AdminPages/CreateAlbumn";
import AlbumContainer from "../AlbumLandingPage/AlbumContainer";
import Albums from "../AlbumLandingPage/AlbumPages/Albums";
import AlbumDetails from "../AlbumLandingPage/AlbumPages/AlbumDetails";
export let Mymap = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/resetpassword",
        element: <Resetpassword />,
      },
      {
        path: "/profile",
        element: <ProfileContainer />,
        children: [
          {
            path: "myaccount",
            element: <MyAccount />,
          },
          {
            path: "addprofile",
            element: <AddProfile />,
          },
          {
            path: "addphoto",
            element: <AddPhoto />,
          },
        ],
      },
      {
        path: "/Admin",
        element: <AdminContainer />,
        children: [
          {
            path: "createalbumn",
            element: <CreateAlbumn />,
          },
        ],
      },
      {
        path: "/",
        element: <AlbumContainer />,
        children: [
          {
            index: true,
            element: <Albums />,
          },
          {
            path: "albumDetails/:albumtitle",
            element: <AlbumDetails />,
          },
        ],
      },
    ],
  },
]);
