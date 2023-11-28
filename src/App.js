import LandingPage from './pages/landingPage';
import Lists from './pages/Lists';
import List from './pages/List';
import NotFound from './pages/notFound';
import NewList from './pages/NewList';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Prioritize from './pages/Prioritize';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
        <Routes>
          <Route exact path="/welcome" element={<LandingPage/>}/>
          <Route exact path="/signin" element={<SignIn/>}/>
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/lists" element={<Lists/>}/>
          <Route exact path="/lists/:id" element={<List/>}/>
          <Route exact path="/lists/new" element={<NewList/>}/>
          <Route exact path="/lists/:id/prioritize" element={<Prioritize/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
  );
}

export default App;
