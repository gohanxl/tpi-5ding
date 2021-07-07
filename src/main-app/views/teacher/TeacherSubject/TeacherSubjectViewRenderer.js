import React from "react";
import { CourseComponent } from "../../../modules/teacher/components/course/Course.component";

export const TeacherSubjectViewRenderer = (props) => {
  return (
    <section>
      <CourseComponent
        title={props.match?.params?.title}
        course={props.match?.params?.course}
      />
    </section>
  );
};
