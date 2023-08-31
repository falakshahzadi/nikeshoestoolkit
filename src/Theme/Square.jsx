

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/reducers/themeSlice";

export default function Square() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>
      <h4>{darkMode ? "Dark" : "Light"} Theme</h4>
      <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
    </>
  );
}