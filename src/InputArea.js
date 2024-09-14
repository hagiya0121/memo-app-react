export function InputArea(props) {
  const { inputText, onChangeText, onClickEdit, onClickDelete } = props;
  return (
    <div className="input-area">
      <textarea value={inputText} rows="20" onChange={onChangeText}></textarea>
      <div>
        <button onClick={onClickEdit}>編集</button>
        <button onClick={onClickDelete}>削除</button>
      </div>
    </div>
  );
}
