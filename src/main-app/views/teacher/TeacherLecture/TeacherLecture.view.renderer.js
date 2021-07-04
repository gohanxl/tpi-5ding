import React from "react";
import { ActivityForm } from "../../../modules/teacher/components/course/activity/components/Activity.form";
import { activity_form_container } from "../../../App.main.module.scss";

export const TeacherLectureViewRenderer = (props) => {
  return (
    <section className={activity_form_container}>
      <ActivityForm claseId={1} activityId={props.match?.params?.id} />
    </section>
  );
};
