import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'

import PostList from './components/PostList';
import ClickLink from './components/ClickLink';
import ShowListDetails from './components/List';
import ListList from './components/Lists';
import Faq from './components/Faq';
import ShowPostDetails from './components/Post';
import Account from './components/Account';
import AccountEdit from './components/AccountEdit';
import AccountOwnedLists from './components/AccountOwnedLists';
import AccountSavedPosts from './components/AccountSavedPosts';
import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';
import Logout from './components/Logout';

const App = () => {
  return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<PostList />} />
            <Route path='/link/:id' element={<ClickLink />} />
            <Route path='/post/:id/:title' element={<ShowPostDetails />} />
            <Route path='/list/:id/:title' element={<ShowListDetails />} />
            <Route path='/list/' element={<ListList />} />
            <Route path='/faq/' element={<Faq />} />
            <Route path='/login/' element={<Login />} />
            <Route path='/register/' element={<Register />} />
            <Route path='/account/' element={<Account />} />
            <Route path='/account/edit' element={<AccountEdit />} />
            <Route path='/account/saved' element={<AccountSavedPosts />} />
            <Route path='/account/owned' element={<AccountOwnedLists />} />
            <Route path='/search/' element={<Search />} />
            <Route path='/logout/' element={<Logout />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
