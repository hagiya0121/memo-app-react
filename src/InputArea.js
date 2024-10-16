import { useLoginStatus } from "./useLoginStatus";

export function InputArea(props) {
  const { inputText, onChangeText, onClickEdit, onClickDelete } = props;
  const { isLoggedIn } = useLoginStatus();
  return (
    <div className="input-area">
      <textarea value={inputText} rows="20" onChange={onChangeText}></textarea>
      {isLoggedIn && (
        <div>
          <button onClick={onClickEdit}>編集</button>
          <button onClick={onClickDelete}>削除</button>
        </div>
      )}
    </div>
  );
}
