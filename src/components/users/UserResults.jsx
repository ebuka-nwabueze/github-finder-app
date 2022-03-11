import { useEffect, useContext } from "react";
import Spinner from "../layout/Spinner"
import UserItem from "../users/UserItem"
import GithubContext from "../context/github/GithubContext";


function UserResults() {
    const {loading, userList} = useContext(GithubContext);


  return loading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {userList.map((user) => (
        <UserItem key={user.id} user={user}/>
      ))}
    </div>
  );
}

export default UserResults;
