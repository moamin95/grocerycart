import NavBar from './Components/AppBar';
import Home from './Components/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Cart from './Components/Cart';

function App() {
  return (
    <>
      <Router>
        <NavBar />
      <Container p={10}>
        <Route exact path="/" component={props => <Home {...props} />} />
        <Route path="/cart">
          <Cart />
        </Route>
      </Container>
  </Router>
    </>
  );
}

export default App;
