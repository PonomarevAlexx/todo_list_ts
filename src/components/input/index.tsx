import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { addTodo, editQuantityNotCompleted } from "../../store/todosSlice";
import styles from "./style.module.css";

export const Input: React.FC = () => {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const trimmedText = value.trim();
        if (e.which === 13 && trimmedText) {
            dispatch(addTodo(trimmedText));
            dispatch(editQuantityNotCompleted());
            setValue("");
        }
    };

    return (
        <header className={styles.form}>
            <input
                value={value}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your ToDo..."
                onKeyDown={handleKeyDown}
            ></input>
        </header>
    );
};
