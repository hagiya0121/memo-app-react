export function IndexMemos(props) {
  const { memos, onClickShow, onClickAdd } = props;
  return (
    <ul>
      {memos.map((memo) => (
        <li onClick={() => onClickShow(memo.key, memo.value)} key={memo.key}>
          {memo.value}
        </li>
      ))}
      <li onClick={onClickAdd}>+</li>
    </ul>
  );
}
