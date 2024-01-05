import { ITask } from "../../App";
import styles from "./Item.module.css";
import { Trash, Check } from "@phosphor-icons/react";

interface Props {
  data: ITask;
  removeTask: (id: number) => void;
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void;
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
  function handleRemove() {
    removeTask(data.id);
  }

  function handleToggleStatus() {
    toggleTaskStatus({ id: data.id, value: !data.isChecked });
  }

  const checkboxCheckedClassname = data.isChecked ? styles["checkbox-checked"] : styles["checkbox-unchecked"];
  const paragraphCheckedClassname = data.isChecked ? styles["paragraph-checked"] : "";

  console.log(data);
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleToggleStatus}>
          <input readOnly type="checkbox" checked={data.isChecked} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.isChecked && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>{data.text}</p>
        </label>
      </div>

      <button onClick={handleRemove}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  );
}
