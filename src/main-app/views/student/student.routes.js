import { StudentLectureViewRenderer } from "./StudentLecture/StudentLecture.view.renderer";
import { StudentAssignatureViewRenderer } from "./StudentAssigature/StudentAssignature.view.renderer";
import { StudentDashboardViewRenderer } from "./StudentDashboard/StudentDashboard.view.renderer";
import { StudentAssignatureListViewRenderer } from "./StudentAssigature/StudentAssignatureList.view.renderer";
import { CallViewContainer } from "../Call/CallView.container";
import { TeacherSubjectViewRenderer } from "../teacher/TeacherSubject/TeacherSubjectViewRenderer";

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
  {
    exact: true,
    path: "/educapp/student/courses",
    component: StudentAssignatureListViewRenderer,
  },
  {
    exact: true,
    path: "/educapp/student/call",
    component: CallViewContainer,
  },
  {
    exact: true,
    path: "/educapp/student/:title/:course",
    component: TeacherSubjectViewRenderer,
  },
];
