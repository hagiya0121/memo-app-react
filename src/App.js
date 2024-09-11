import { useState, useEffect } from "react";
import { IndexMemos } from "./IndexMemos";
import { InputArea } from "./InputArea";
import "./App.css";

export function App() {
  const [inputText, setInputText] = useState("");
  const [memos, setMemos] = useState([]);
  const [editKey, setEditKey] = useState("");

  function loadMemos() {
    const storedMemos = localStorage.getItem("memos");
    return storedMemos ? JSON.parse(storedMemos) : {};
  }

  function saveMemos(newMemos) {
    localStorage.setItem("memos", JSON.stringify(newMemos));
  }

  useEffect(() => {
    const storedMemos = loadMemos();
    const memosArray = Object.keys(storedMemos).map((key) => ({
      key,
      value: storedMemos[key],
    }));
    setMemos(memosArray);
  }, []);

  function onClickAdd() {
    const key = new Date().toISOString();
    const newMemo = { key, value: "新規メモ" };
    const storedMemos = loadMemos();
    storedMemos[key] = newMemo.value;
    saveMemos(storedMemos);
    setMemos([...memos, newMemo]);
    setEditKey(key);
    setInputText(newMemo.value);
  }

  function onChangeText(event) {
    setInputText(event.target.value);
  }

  function onClickEdit() {
    const storedMemos = loadMemos();
    storedMemos[editKey] = inputText;
    const newMemos = memos.map((memo) =>
      memo.key === editKey ? { key: editKey, value: inputText } : memo,
    );
    saveMemos(storedMemos);
    setMemos(newMemos);
    setEditKey("");
  }

  function onClickShow(key, value) {
    setInputText(value);
    setEditKey(key);
  }

  function onClickDelete() {
    const storedMemos = loadMemos();
    delete storedMemos[editKey];
    saveMemos(storedMemos);
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
