import MainTemplate from "@/components/MainTemplate";
import store from "@/redux/store/store";
import { Provider } from "react-redux";

export default function Home() {
  
  return (
    <Provider store={store}>
      <MainTemplate />
    </Provider>
  );
}
