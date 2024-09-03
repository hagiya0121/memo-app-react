import { useState, useEffect } from "react";
import { IndexMemos } from "./IndexMemos";
import { InputArea } from "./InputArea";
import "./App.css";

export function App() {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [memos, setMemos] = useState([]);
  const [editKey, setEditKey] = useState("");

  useEffect(() => {
    const allMemos = Object.keys(localStorage).map((key) => ({
      key: key,
      value: localStorage.getItem(key),
    }));
    setMemos(allMemos);
  }, []);

  function onClickAdd() {
    const key = new Date().toISOString();
    localStorage.setItem(key, "新規メモ");
    setMemos([...memos, { key: key, value: "新規メモ" }]);
    setEditKey(key);
    setShowInput(true);
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
    setShowInput(false);
  }

  function onClickShow(key, value) {
    setShowInput(true);
    setInputText(value);
    setEditKey(key);
  }

  function onClickDelete() {
    localStorage.removeItem(editKey);
    setMemos(memos.filter((memo) => memo.key !== editKey));
    setShowInput(false);
  }

  return (
    <div className="main">
      <IndexMemos
        memos={memos}
        editKey={editKey}
        onClickShow={onClickShow}
        onClickAdd={onClickAdd}
      />
      {showInput && (
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
