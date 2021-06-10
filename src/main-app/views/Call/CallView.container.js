import { connect } from "react-redux";
import { CallViewRenderer } from "./CallViewRenderer";

import { getUser } from "../../../main-app/modules/user/store/user.selectors";

const mapStateToProps = (state) => ({
  currentUser: getUser(state),
});

const mapDispatchToProps = {};

export const CallViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallViewRenderer);
