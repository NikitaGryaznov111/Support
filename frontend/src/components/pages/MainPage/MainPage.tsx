import { Spinner } from "react-activity";
import Users from "../../simple/Users/Users";
import Sidebar from "../../simple/Sidebar/Sidebar";
import { useGetUsers } from "../../../hooks/useGetUsers";

const MainPage = () => {
  const { data: users, isError, isFetching } = useGetUsers();
  return (
    <div className="flex">
      <Sidebar />
      {isFetching ? <Spinner color="red" size={50} speed={1} animating={true} /> : <Users users={users || []} />}
    </div>
  );
};

export default MainPage;
