import { connect } from "react-redux";
import { Home } from "./Home.component";

import { getCounterValue } from "../store/home.selectors";
import { addToCounter } from "../store/home.thunks";

const mapStateToProps = (state) => ({
  count: getCounterValue(state),
});

const mapDispatchToProps = {
  addToCounter,
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
