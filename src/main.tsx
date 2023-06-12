import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { useGlobalDataStore } from "./hooks/useInitialState/globalData";
import { StorageKey } from "./constants";
import { UserInfo, getUserInfoService } from "./services/user";
import store from "storejs";

export async function getInitialState() {
  const accessToken = store.get(StorageKey.AccessToken);
  if (accessToken !== null) {
    const rsp = await getUserInfoService();
    if (rsp.success) {
      return {
        userInfo: rsp.data,
        login: true,
      };
    }
  }
  return {
    userInfo: null as UserInfo | null,
    login: false,
  };
}

function render() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
  );
}

async function main() {
  const initialState = await getInitialState();
  useGlobalDataStore.setState({ initialState });
  render();
}

main();
