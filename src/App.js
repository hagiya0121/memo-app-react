import { useState, useEffect } from "react";

export function App() {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [memos, setMemos] = useState([]);
  const [editKey, setEditKey] = useState("");

  useEffect(() => {
    setMemos(getAllMemos());
  }, []);

  function getAllMemos() {
    const allMemos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      allMemos.push({ key: key, value: value });
    }
    return allMemos;
  }

  function onClickAdd() {
    setShowInput(true);
    setInputText("");
  }

  function onChangeText(event) {
    setInputText(event.target.value);
  }

  function onClickEdit() {
    if (editKey) {
      localStorage.setItem(editKey, inputText);
      const nextMemos = memos.map((memo) => {
        if (memo.key === editKey) {
          return { key: editKey, value: inputText };
        } else {
          return memo;
        }
      });
      setMemos(nextMemos);
      setEditKey("");
    } else {
      const time = new Date().toISOString();
      localStorage.setItem(time, inputText);
      setMemos([...memos, { key: time, value: inputText }]);
    }
    setInputText("");
    setShowInput(false);
  }

  function onClickUpdate(key, value) {
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
      <ul>
        {memos.map((memo) => (
          <li
            onClick={() => onClickUpdate(memo.key, memo.value)}
            key={memo.key}
          >
            {memo.value}
          </li>
        ))}
        <li onClick={onClickAdd}>+</li>
      </ul>
      {showInput && (
        <>
          <textarea
            value={inputText}
            rows="20"
            onChange={onChangeText}
          ></textarea>
          <button onClick={onClickEdit}>編集</button>
          <button onClick={onClickDelete}>削除</button>
        </>
      )}
    </>
  );
}
