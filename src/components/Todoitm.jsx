import React from "react";
import TodoItem from "./TodoItem";

const Todoitm = ({
  todo,
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
            key={item.name}
            todoName={item.name}
            toDate={item.dueDate}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
            onSaveEdit={onSaveEdit}
            isEditing={item === editingItem}
          />
        ))}
      </div>
    </>
  );
};

export default Todoitm;
