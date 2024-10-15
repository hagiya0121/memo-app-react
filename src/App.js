import { useState, useEffect } from "react";
import { IndexMemos } from "./IndexMemos";
import { InputArea } from "./InputArea";
import { useLoginStatus } from "./useLoginStatus";
import "./App.css";

export function App() {
  const [inputText, setInputText] = useState("");
  const [memos, setMemos] = useState({});
  const [editKey, setEditKey] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useLoginStatus();
  const message = isLoggedIn ? "ログアウト" : "ログイン";

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

  return (
    <>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>{message}</button>
      <div className="main">
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
      </div>
    </>
  );
}
