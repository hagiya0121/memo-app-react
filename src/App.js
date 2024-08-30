import { useState, useEffect } from "react";

export function App() {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [memos, setMemos] = useState({});
  const [editKey, setEditKey] = useState("");

  useEffect(() => {
    setMemos(getAllMemos());
  }, []);

  function getAllMemos() {
    const memos = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      memos[key] = value;
    }
    return memos;
  }

  function onClickAdd() {
    setShowInput(true);
  }

  function onChangeText(event) {
    setInputText(event.target.value);
  }

  function onClickEdit() {
    if (editKey) {
      localStorage.setItem(editKey, inputText);
      setMemos({
        ...memos,
        [editKey]: inputText,
      });
      setEditKey("");
    } else {
      const time = new Date().toISOString();
      localStorage.setItem(time, inputText);
      setMemos({
        ...memos,
        [time]: inputText,
      });
    }
    setInputText("");
    setShowInput(false);
  }

  function onClickUpdate(key) {
    setShowInput(true);
    setInputText(memos[key]);
    setEditKey(key);
  }

  return (
    <>
      <ul>
        {Object.keys(memos).map((key) => (
          <li onClick={() => onClickUpdate(key)} key={key}>
            {memos[key].split("\n")[0]}
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
          <button>削除</button>
        </>
      )}
    </>
  );
}
