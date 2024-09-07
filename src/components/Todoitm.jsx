import React from "react";
import TodoItem from "./TodoItem";

const Todoitm = ({
  todo,
  userId,
  onDeleteClick,
  onEditClick,
  onSaveEdit,
  editingItem,
}) => {
  return (
    <>
      <div className="items-container">
        {todo.map((item) => (
          <TodoItem
            userId={userId}
            key={item.name}
            todoName={item.name}
            toDate={item.dueDate}
            id={item.id}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
            onSaveEdit={onSaveEdit}
            isEditing={item.name === editingItem}
          />
        ))}
      </div>
    </>
  );
};

export default Todoitm;
