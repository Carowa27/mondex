import { useAuth0 } from "@auth0/auth0-react";
import { LogoutBtn } from "../components/LogoutBtn";

export const UserMyPages = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <>
          <h1>My pages</h1>
          <div className="column">
            <img
              src={user?.picture}
              alt={`profile picture of ${user?.nickname}`}
            />
            <p>Username: {user?.nickname}</p>
            <p>Email: {user?.email}</p>
          </div>
          <LogoutBtn />
        </>
      )}
    </>
  );
};
