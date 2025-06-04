import { Layout } from "./components/layout";
import { Input } from "./components/input";
import { TodoList } from "./components/todoList";
import { Footer } from "./components/footer";

function App() {
    return (
        <Layout>
            <Input />
            <TodoList />
            <Footer />
        </Layout>
    );
}

export default App;
