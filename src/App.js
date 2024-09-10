import { useState, useEffect } from "react";
import { IndexMemos } from "./IndexMemos";
import { InputArea } from "./InputArea";
import "./App.css";

export function App() {
  const [inputText, setInputText] = useState("");
  const [memos, setMemos] = useState([]);
  const [editKey, setEditKey] = useState("");

  useEffect(() => {
    const allMemos = Object.keys(localStorage).map((key) => ({
      key,
      value: localStorage.getItem(key),
    }));
    setMemos(allMemos);
  }, []);

  function onClickAdd() {
    const key = new Date().toISOString();
    localStorage.setItem(key, "新規メモ");
    setMemos([...memos, { key, value: "新規メモ" }]);
    setEditKey(key);
    setInputText("新規メモ");
  }

  function onChangeText(event) {
    setInputText(event.target.value);
  }

  function onClickEdit() {
    localStorage.setItem(editKey, inputText);
    const newMemos = memos.map((memo) =>
      memo.key === editKey ? { key: editKey, value: inputText } : memo
    );
    setMemos(newMemos);
    setEditKey("");
  }

  function onClickShow(key, value) {
    setInputText(value);
    setEditKey(key);
  }

  function onClickDelete() {
    localStorage.removeItem(editKey);
    setMemos(memos.filter((memo) => memo.key !== editKey));
    setEditKey("");
  }

  return (
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
  );
}
