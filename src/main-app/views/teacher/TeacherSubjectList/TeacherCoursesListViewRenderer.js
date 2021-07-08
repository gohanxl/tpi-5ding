import React from "react";
import { CourseSubjectComponent } from "../../../modules/teacher/components/CourseSubject.component";
import historySvg from "../../../../assets/img/education/007-history.svg";
import geographySvg from "../../../../assets/img/education/008-geography.svg";

export const TeacherCoursesListViewRenderer = () => {
  const thisDataMustComeFromServer = [
    {
      course: "5to A",
      subjects: [
        {
          name: "GEOGRAFÍA",
          image: geographySvg,
          route: "/educapp/teacher/subject/Geografía/5to_A",
        },
        {
          name: "HISTORIA",
          image: historySvg,
          route: "/educapp/teacher/subject/Historia/5to_A",
        },
      ],
    },
    {
      course: "6to B",
      subjects: [
        {
          name: "GEOGRAFÍA",
          image: geographySvg,
          route: "/educapp/teacher/subject/Geografía/6to_B",
        },
        {
          name: "HISTORIA",
          image: historySvg,
          route: "/educapp/teacher/subject/Historia/6to_B",
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
