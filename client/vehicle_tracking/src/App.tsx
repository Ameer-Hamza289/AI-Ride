import { BrowserRouter, Route, Routes } from "react-router-dom";
import VehicleListing from "./pages/VehicleListing";
import Login from "./pages/login";
import Register from "./pages/register";
import VehicleDetail from "./pages/VehicleDetail";
import Navbar from "./components/Navbar";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

const App = () => {

  return (
    <Provider store={store}>
      <ToastContainer />
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<VehicleListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vehicle/:slug" element={<VehicleDetail />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )

}

export default App;