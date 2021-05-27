import { StudentLectureViewRenderer } from "./StudentLecture/StudentLecture.view.renderer";
import { StudentAssignatureViewRenderer } from "./StudentAssigature/StudentAssignature.view.renderer";
import { StudentDashboardViewRenderer } from "./StudentDashboard/StudentDashboard.view.renderer";

export const studentRoutes = [
  {
    exact: true,
    path: "/educapp/student",
    component: StudentLectureViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/student/assignature",
    component: StudentAssignatureViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/student/dashboard",
    component: StudentDashboardViewRenderer,
  },
];
