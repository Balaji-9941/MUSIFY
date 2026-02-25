  import React from "react";
  // import Navbar from "./Navbar_Block/Navbar";
  import { RouterProvider } from "react-router-dom";
  import { Mymap } from "./Router/Map";
  import Authcontext from "./Context/Authcontext";
  const App = () => {
    return (
      <>
        <Authcontext>
          <RouterProvider router={Mymap} />
        </Authcontext>
      </>
    );
  };

  export default App;
