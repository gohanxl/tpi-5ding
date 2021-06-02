import { connect } from "react-redux";
import Dashboard from "../../dashboard/components/Dashboard.component";

import { getCounterValue } from "../store/home.selectors";
import { addToCounter } from "../store/home.thunks";

const mapStateToProps = (state) => ({
  count: getCounterValue(state),
});

const mapDispatchToProps = {
  addToCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
