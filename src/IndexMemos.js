import { useLoginStatus } from "./useLoginStatus";

export function IndexMemos(props) {
  const { memos, editKey, onClickShow, onClickAdd } = props;
  const memoList = Object.entries(memos);
  const { isLoggedIn } = useLoginStatus();
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
      {isLoggedIn && <li onClick={onClickAdd}>+</li>}
    </ul>
  );
}
