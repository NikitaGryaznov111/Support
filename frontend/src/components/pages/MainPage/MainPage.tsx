import { ClipLoader } from "react-spinners";
import Users from "../../simple/Users/Users";
import Sidebar from "../../simple/Sidebar/Sidebar";
import { useGetUsers } from "../../../hooks/useGetUsers";
import { Colors } from "../../../styles/colors";

const MainPage = () => {
  const { data: users, isError, isPending } = useGetUsers();
  return (
    <div className="flex flex-row">
      <Sidebar />
      {isPending ? (
        <div className="mx-auto mt-5">
          <ClipLoader color={Colors.BlueL} size={50} speedMultiplier={1} />
        </div>
      ) : isError ? (
        <p className="m-5 text-lg">Ошибка загрузки пользователей</p>
      ) : (
        <Users users={users || []} />
      )}
    </div>
  );
};

export default MainPage;
