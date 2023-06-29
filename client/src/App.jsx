import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import MyGigs from "./pages/myGigs/MyGigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import Orders from "./pages/orders/Orders";
import Add from "./pages/add/Add";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import "./App.scss";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Router>
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/gig/:id" element={<Gig />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/mygigs" element={<MyGigs />} />
            <Route path="/add" element={<Add />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/message/:id" element={<Message />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </QueryClientProvider>
      </div>
    </Router>
  );
};

export default App;
