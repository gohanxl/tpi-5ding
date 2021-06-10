import React from "react";
import { CourseSubjectComponent } from "../../../modules/teacher/components/CourseSubject.component";
import historySvg from "../../../../assets/img/education/007-history.svg";
import geographySvg from "../../../../assets/img/education/008-geography.svg";

export const TeacherAssignatureViewRenderer = () => {
  const thisDataMustComeFromServer = [
    {
      course: "5to A",
      subjects: [
        {
          name: "GEOGRAFÍA",
          image: historySvg,
          route: "/educapp/student",
        },
        {
          name: "HISTORIA",
          image: geographySvg,
          route: "/educapp/student",
        },
      ],
    },
    {
      course: "6to B",
      subjects: [
        {
          name: "GEOGRAFÍA",
          image: historySvg,
          route: "/educapp/student",
        },
        {
          name: "HISTORIA",
          image: geographySvg,
          route: "/educapp/student",
        },
      ],
    },
  ];

  return (
    <section>
      {thisDataMustComeFromServer.map((data) => (
        <CourseSubjectComponent
          key={data.course}
          course={data.course}
          subjects={data.subjects}
        />
      ))}
      <br />
    </section>
  );
};
