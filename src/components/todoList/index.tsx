import { useAppSelector } from "../../hooks";
import { TodoItem } from "../todoItem";

import styles from "./style.module.css";

export const TodoList: React.FC = () => {
    let todosList = useAppSelector((state) => state.todos.todosList);
    const selectedStatus = useAppSelector((state) => state.todos.selectedStatus);

    if (selectedStatus === "important") {
        todosList = todosList.filter((el) => el.important);
    }

    if (selectedStatus === "active") {
        todosList = todosList.filter((el) => !el.completed);
    }

    if (selectedStatus === "completed") {
        todosList = todosList.filter((el) => el.completed);
    }

    return (
        <ul className={styles.todoList}>
            {todosList.map((todo, ind) => {
                return (
                    <li className={styles.todoListItem} key={todo.id}>
                        <TodoItem todo={todo} index={ind} />
                    </li>
                );
            })}
        </ul>
    );
};
