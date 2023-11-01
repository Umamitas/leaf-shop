import { Outlet } from "react-router-dom";
import Directory from "../../Directory/Directory.component";

const Home = () => {
   
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  );
};

export default Home;
