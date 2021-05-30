import { TeacherLectureViewRenderer } from "./TeacherLecture/TeacherLecture.view.renderer";
import { TeacherAssignatureViewRenderer } from "./TeacherAssignature/TeacherAssignature.view.renderer";
import { TeacherMessageViewRenderer } from "./TeacherMessages/TeacherMessageViewRenderer";

export const teacherRoutes = [
  {
    exact: true,
    path: "/educapp/teacher",
    component: TeacherLectureViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/teacher/subjects",
    component: TeacherAssignatureViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/teacher/messages",
    component: TeacherMessageViewRenderer,
  },
];
