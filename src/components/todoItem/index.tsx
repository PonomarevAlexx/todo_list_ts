import styles from "./style.module.css";
import { deleteTodo, toggleCompleted, addTodoToImportant, editQuantityNotCompleted } from "../../store/todosSlice";
import { useAppDispatch } from "../../hooks";
import type { Todo } from "../../store/todosSlice";

type Prop = {
    todo: Todo;
    index: number;
};

export const TodoItem: React.FC<Prop> = (props) => {
    const dispatch = useAppDispatch();

    const handleDeletTodo = () => {
        dispatch(deleteTodo(props.todo.id));
        dispatch(editQuantityNotCompleted());
    };

    const handleToggleCompleted = () => {
        dispatch(toggleCompleted(props.todo.id));
        dispatch(editQuantityNotCompleted());
    };

    const handleAddTodoToImportant = () => {
        dispatch(addTodoToImportant(props.todo.id));
    };

    return (
        <div className={props.todo.completed ? `${styles.todoItem} ${styles.todoItemCompleted}` : styles.todoItem}>
            <div className={styles.todoItemContent}>
                <p className={styles.todoItemId}>{props.index + 1}</p>
                <p className={styles.todoItemText}>{props.todo.text}</p>
            </div>
            <div className={styles.todoItemTools}>
                <p onClick={handleToggleCompleted} className={styles.todoItemCompleted}>
                    ✔
                </p>
                <p
                    onClick={handleAddTodoToImportant}
                    className={
                        props.todo.important ? `${styles.todoItemImportant} ${styles.active}` : styles.todoItemImportant
                    }
                >
                    ✭
                </p>
                <p onClick={handleDeletTodo} className={styles.todoItemClose}>
                    ✗
                </p>
            </div>
        </div>
    );
};
