import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

type Props = {
  MakeLogin: React.FC;
};

const Router: React.FC<Props> = ({ MakeLogin }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/login" />
        <Route path="/login" component={MakeLogin} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
