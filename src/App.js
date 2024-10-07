import { useState, useEffect } from "react";
import { IndexMemos } from "./IndexMemos";
import { InputArea } from "./InputArea";
import { loginContext } from "./loginContext";
import "./App.css";

export function App() {
  const [inputText, setInputText] = useState("");
  const [memos, setMemos] = useState({});
  const [editKey, setEditKey] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const message = isLogin ? "ログアウト" : "ログイン";

  function saveMemos(newMemos) {
    localStorage.setItem("memos", JSON.stringify(newMemos));
  }

  useEffect(() => {
    const loadMemos = JSON.parse(localStorage.getItem("memos")) || {};
    setMemos(loadMemos);
  }, []);

  function onClickAdd() {
    const key = new Date().toISOString();
    const newMemos = { ...memos, [key]: "新規メモ" };
    setMemos(newMemos);
    saveMemos(newMemos);
    setEditKey(key);
    setInputText("新規メモ");
  }

  function onChangeText(event) {
    setInputText(event.target.value);
  }

  function onClickEdit() {
    const newMemos = { ...memos, [editKey]: inputText };
    setMemos(newMemos);
    saveMemos(newMemos);
    setEditKey("");
  }

  function onClickShow(key, value) {
    setInputText(value);
    setEditKey(key);
  }

  function onClickDelete() {
    const newMemos = { ...memos };
    delete newMemos[editKey];
    setMemos(newMemos);
    saveMemos(newMemos);
    setEditKey("");
  }

  function onClickButton() {
    setIsLogin(!isLogin);
  }

  return (
    <>
      <button onClick={onClickButton}>{message}</button>
      <div className="main">
        <loginContext.Provider value={isLogin}>
          <IndexMemos
            memos={memos}
            editKey={editKey}
            onClickShow={onClickShow}
            onClickAdd={onClickAdd}
          />
          {editKey !== "" && (
            <InputArea
              inputText={inputText}
              onChangeText={onChangeText}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
            />
          )}
        </loginContext.Provider>
      </div>
    </>
  );
}
