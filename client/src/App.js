import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";

import Signin from "./components/Signin";
import { useEffect, useState } from "react";
import makeFetchRequest from "./utils/make-fetch-request";
import { getDirectory } from "./service/handleGet";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const [directory, setDirectory] = useState(null);
  const [routes, setRoutes] = useState("");

  const getData = async () => {
    if (user.email) {
      const result = await makeFetchRequest(() => getDirectory(user.email));
      setDirectory(result.data.userObj)
      setRoutes(result.routes)
    }
  };

  useEffect(() => {
    if (user) getData();
  }, [user])

  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
            {/* Homepage to split into Directory + Homepage */}
            <Route path="/" element={<Homepage myObj={directory}/>} />
            <Route path="/signin" element={<Signin />} />
            <Route path={routes} element={<Homepage myObj={directory}/>}/>
            
          </Routes>
        </Router>
    </div>
  );
}

export default App;
