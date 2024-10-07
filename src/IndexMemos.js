import { useContext } from "react";
import { loginContext } from "./loginContext.js";

export function IndexMemos(props) {
  const { memos, editKey, onClickShow, onClickAdd } = props;
  const memoList = Object.entries(memos);
  const isLogin = useContext(loginContext);
  memoList.sort(([, valueA], [, valueB]) => valueA.localeCompare(valueB));

  return (
    <ul className="memo-list">
      {memoList.map(([key, value]) => (
        <li
          className={editKey === key && "selected"}
          onClick={() => onClickShow(key, value)}
          key={key}
        >
          {value.split("\n")[0]}
        </li>
      ))}
      {isLogin && <li onClick={onClickAdd}>+</li>}
    </ul>
  );
}
