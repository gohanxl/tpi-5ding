import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { institutosService } from "../../../api/instituto-service.js";
import { useSelector } from "react-redux";
import { Class } from "../../../modules/shared-components/Class/components/Class.component.js";

export const StudentLectureViewRenderer = () => {
  //TODO Remove this later, this comment explains how to call backend api

  // const {
  //     user,
  //     isAuthenticated,
  //    getAccessTokenSilently
  // } = useAuth0();
  //
  // getAccessTokenSilently({
  //     audience: '5coding-backend',
  //     scope: "ADMIN",
  // }).then(res => fetch('http://localhost:5000/api/Institutos', {
  //     headers: {
  //         Authorization: `Bearer ${res}`
  //     }}))
  //     .then(res => console.log(res.json()))
  //     .catch(err => console.log(err));

  const user = useSelector((state) => state.user);
  console.log(user);

  /*
  institutosService.getInstitutos('token').then(res => {
    console.log(res.data)
  });
  */

  return <Class />;
};
