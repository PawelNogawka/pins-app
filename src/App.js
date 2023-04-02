import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";
import PinDetails from "./pages/PinDetails/PinDetails";
import UserDetails from "./pages/userDetails/UserDetails";
import Categories from "./pages/categories/Categories";
import Search from "./pages/search/Search";
import CreatePin from "./pages/createPin/CreatePin";
import NotFound from "./pages/notFound/NotFound";

function App() {
  const [isSidebarShow, setIsSidebarShow] = useState(false);

  const { user } = useAuthContext();

  return (
    <>
      <Navbar
        isSidebarShow={isSidebarShow}
        setIsSidebarShow={setIsSidebarShow}
      />
      <Sidebar
        isSidebarShow={isSidebarShow}
        setIsSidebarShow={setIsSidebarShow}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/szczegoly/:id" element={<PinDetails user={user} />} />
        <Route path="/uzytkownik/:id" element={<UserDetails />} />
        <Route path="/kategorie/:slug" element={<Categories />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route
          path="/utworz-pin"
          element={user ? <CreatePin user={user} /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
