import { TeacherLectureViewRenderer } from "./TeacherLecture/TeacherLecture.view.renderer";
import { TeacherAssignatureViewRenderer } from "./TeacherAssignature/TeacherAssignature.view.renderer";

export const teacherRoutes = [
  {
    exact: true,
    path: "/educapp/teacher",
    component: TeacherLectureViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/teacher/assignature",
    component: TeacherAssignatureViewRenderer,
  },
];
