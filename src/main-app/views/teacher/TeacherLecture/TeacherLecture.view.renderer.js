import React from "react";
import { ActivityForm } from "../../../modules/teacher/components/course/activity/components/Activity.form";
import { activity_form_container } from "../../../App.main.module.scss";

export const TeacherLectureViewRenderer = () => {
  return (
    <section className={activity_form_container}>
      <ActivityForm claseId={1} />
    </section>
  );
};
