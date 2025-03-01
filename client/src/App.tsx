import { Routes, Route } from "react-router-dom";
import { HomePage, RedirectPage, PhoneVerificationPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/redirect" element={<RedirectPage />} />
      <Route path="/phone" element={<PhoneVerificationPage />} />
    </Routes>
  );
};

export default App;
