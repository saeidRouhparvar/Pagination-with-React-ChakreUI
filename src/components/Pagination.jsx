import React, { useEffect, useState } from "react";

export default function Pagination() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
      });
  }, []);

  
  return <div>Pagination</div>;
}
