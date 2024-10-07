import { useContext } from "react";
import { loginContext } from "./loginContext.js";

export function InputArea(props) {
  const { inputText, onChangeText, onClickEdit, onClickDelete } = props;
  const isLogin = useContext(loginContext);
  return (
    <div className="input-area">
      <textarea value={inputText} rows="20" onChange={onChangeText}></textarea>
      {isLogin && (
        <div>
          <button onClick={onClickEdit}>編集</button>
          <button onClick={onClickDelete}>削除</button>
        </div>
      )}
    </div>
  );
}
