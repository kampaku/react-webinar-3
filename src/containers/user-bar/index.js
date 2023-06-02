import { useNavigate } from "react-router";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import { Link } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import { useCallback } from "react";

function UserBar() {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isLogin: state.user.isLogin,
    user: state.user.info,
  }));

  const callback = {
    logout: useCallback(() => store.actions.user.logout(), []),
  };

  useInit(() => {
    store.actions.user.fetchInfo();
  }, []);

  if (select.isLogin === false) {
    return (
      <SideLayout padding="small" side="end">
        <button onClick={() => navigate("/login")}>Вход</button>
      </SideLayout>
    );
  }

  return (
    <SideLayout padding="small" side="end">
      <Link to={"/profile"}>{select.user.name}</Link>
      <button onClick={callback.logout}>Выход</button>
    </SideLayout>
  );
}

export default UserBar;
