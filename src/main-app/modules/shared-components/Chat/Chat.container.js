import { connect } from "react-redux";
import { Chat } from "./Chat.component";

import { getUser } from "../../user/store/user.selectors";

const mapStateToProps = (state) => ({
  currentUser: getUser(state),
});

const mapDispatchToProps = {};

export const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);
