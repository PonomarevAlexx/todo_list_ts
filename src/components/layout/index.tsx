import styles from "./style.module.css";

type Props = {
    children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
    return <div className={styles.layout}>{children}</div>;
};
