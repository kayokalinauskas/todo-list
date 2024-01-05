import { useState } from "react";
import { Button } from "./components/Button";
import styles from "./App.module.css";
import { Input } from "./components/Input";
import { Header } from "./components/Header";
import { Header as ListHeader } from "./components/List/Header";
import { Item } from "./components/List/Item";
import { Empty } from "./components/List/Empty";
import { PlusCircle } from "@phosphor-icons/react";

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState("");

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1;
    }

    return prevValue;
  }, 0);

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (!confirm("Deseja mesmo apagar essa tarefa?")) {
      return;
    }

    setTasks(filteredTasks);
  }

  function handleToggleTaskStatus({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value };
      }

      return { ...task };
    });

    setTasks(updatedTasks);
  }

  function handleCreateNewTask() {
    if (!inputValue) {
      return;
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    };
    setTasks((state) => [...state, newTask]);
    setInputValue("");
  }

  function handleKeyboardInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!inputValue) {
        return;
      }
      const newTask: ITask = {
        id: new Date().getTime(),
        text: inputValue,
        isChecked: false,
      };
      setTasks((state) => [...state, newTask]);
      setInputValue("");
    }
    return;
  }

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInputContainer}>
          <Input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={handleKeyboardInput}
          ></Input>
          <Button onClick={handleCreateNewTask}>
            Criar <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          <ListHeader tasksCounter={tasks.length} checkedTasksCounter={checkedTasksCounter} />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={handleToggleTaskStatus}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
