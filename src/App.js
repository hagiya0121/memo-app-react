import { useState, useEffect } from "react";
import { IndexMemos } from "./IndexMemos";
import { InputArea } from "./InputArea";

export function App() {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [memos, setMemos] = useState([]);
  const [editKey, setEditKey] = useState("");

  useEffect(() => {
    const allMemos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      allMemos.push({ key: key, value: value });
    }
    setMemos(allMemos);
  }, []);

  function onClickAdd() {
    const time = new Date().toISOString();
    localStorage.setItem(time, "新規メモ");
    setMemos([...memos, { key: time, value: "新規メモ" }]);
    setEditKey(time);
    setShowInput(true);
    setInputText("新規メモ");
  }

  function onChangeText(event) {
    setInputText(event.target.value);
  }

  function onClickEdit() {
    if (editKey) {
      localStorage.setItem(editKey, inputText);
      const newMemos = memos.map((memo) =>
        memo.key === editKey ? { key: editKey, value: inputText } : memo
      );
      setMemos(newMemos);
      setEditKey("");
      setShowInput(false);
      return;
    }

    const time = new Date().toISOString();
    localStorage.setItem(time, inputText);
    setMemos([...memos, { key: time, value: inputText }]);
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
    <>
      <IndexMemos
        memos={memos}
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
    </>
  );
}
