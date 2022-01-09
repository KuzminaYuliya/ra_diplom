import { Route, Switch } from "react-router-dom";

import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import FullCard from "./pages/FullCard";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Cart from "./pages/Cart";
import Page404 from "./pages/Page404";

import Header from "./components/Header/Header";
import MainContainer from "./components/MainContainer";
import Search from "./components/Search";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div>
      <Header />
      <MainContainer>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/catalog/:id" component={FullCard} />
          <Route path="/catalog">
            <Catalog>
              <Search />
            </Catalog>
          </Route>
          <Route path="/cart" component={Cart} />
          <Route path="/" exact component={Main} />
          <Route path="*" component={Page404} />
        </Switch>
      </MainContainer>
      <Footer />
    </div>
  );
}

export default App;
