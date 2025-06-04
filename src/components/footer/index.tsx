import {
    allCompleted,
    deleteAllTodos,
    deleteCompletedTodos,
    changeStatus,
    editQuantityNotCompleted,
} from "../../store/todosSlice";
import styles from "./style.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks";

export const Footer: React.FC = () => {
    const checked = useAppSelector((state) => state.todos.checkedCompleted);
    const selectedStatus = useAppSelector((state) => state.todos.selectedStatus);
    const quantityNotSelected = useAppSelector((state) => state.todos.quantityNotCompletedTodos);
    const dispatch = useAppDispatch();

    console.log(quantityNotSelected);

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(allCompleted(e.target.checked));
        dispatch(editQuantityNotCompleted());
    };

    const handleDeleteAllTodos = () => {
        dispatch(deleteAllTodos());
        dispatch(editQuantityNotCompleted());
    };

    const handleDeleteCompletedTodos = () => {
        dispatch(deleteCompletedTodos());
    };

    const handleChangeImportant = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatus(e.target.value));
    };

    return (
        <div className={styles.footer}>
            <div className={styles.footerItem}>
                <p className={styles.footerText}>
                    {quantityNotSelected} {quantityNotSelected > 1 ? "items" : "item"} left
                </p>
            </div>
            <div className={styles.footerItem}>
                <button onClick={handleDeleteAllTodos} className={styles.footerBtn}>
                    Delete All
                </button>
            </div>
            <div className={styles.footerItem}>
                <p>All Completed</p>
                <input onChange={handleChecked} type="checkbox" className="input-checked" checked={checked}></input>
            </div>
            <div className={styles.footerItem}>
                <button onClick={handleDeleteCompletedTodos} className={styles.footerBtn}>
                    Delete Completed
                </button>
            </div>
            <div className={`${styles.footerItem} ${styles.footerItemRadio}`}>
                <div>
                    <input
                        onChange={handleChangeImportant}
                        type="radio"
                        id="all"
                        name="important"
                        checked={selectedStatus === "all" && true}
                        value="all"
                    />
                    <label htmlFor="all">All</label>
                </div>
                <div>
                    <input
                        onChange={handleChangeImportant}
                        type="radio"
                        id="important"
                        name="important"
                        checked={selectedStatus === "important" && true}
                        value="important"
                    />
                    <label htmlFor="all">Important</label>
                </div>
                <div>
                    <input
                        onChange={handleChangeImportant}
                        type="radio"
                        id="active"
                        name="important"
                        checked={selectedStatus === "active" && true}
                        value="active"
                    />
                    <label htmlFor="all">Active</label>
                </div>
                <div>
                    <input
                        onChange={handleChangeImportant}
                        type="radio"
                        id="completed"
                        name="important"
                        checked={selectedStatus === "completed" && true}
                        value="completed"
                    />
                    <label htmlFor="all">Completed</label>
                </div>
            </div>
        </div>
    );
};
