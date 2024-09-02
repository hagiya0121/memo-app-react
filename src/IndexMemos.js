export function IndexMemos(props) {
  const { memos, editKey, onClickShow, onClickAdd } = props;
  return (
    <ul className="memo-list">
      {memos.map((memo) => (
        <li
          className={editKey === memo.key ? "selected" : ""}
          onClick={() => onClickShow(memo.key, memo.value)}
          key={memo.key}
        >
          {memo.value.split("\n")[0]}
        </li>
      ))}
      <li onClick={onClickAdd}>+</li>
    </ul>
  );
}
