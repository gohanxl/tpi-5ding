import { TeacherLectureViewRenderer } from "./TeacherLecture/TeacherLecture.view.renderer";
import { TeacherCoursesListViewRenderer } from "./TeacherSubjectList/TeacherCoursesListViewRenderer";
import { TeacherMessageViewRenderer } from "./TeacherMessages/TeacherMessageViewRenderer";
import { TeacherDashboardViewRenderer } from "./TeacherDashboard/TeacherDashboard.view.renderer";
import { CallViewContainer } from "../Call/CallView.container";
import { TeacherSubjectViewRenderer } from "./TeacherSubject/TeacherSubjectViewRenderer";

export const teacherRoutes = [
  {
    exact: true,
    path: "/educapp/teacher/activity",
    component: TeacherLectureViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/teacher/activity/:id",
    component: TeacherLectureViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/teacher/courses",
    component: TeacherCoursesListViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/teacher/subject",
    component: TeacherSubjectViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/teacher/messages",
    component: TeacherMessageViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/teacher/call",
    component: CallViewContainer,
  },
  {
    exact: true,
    path: "/educapp/teacher/dashboard",
    component: TeacherDashboardViewRenderer,
  },
];
