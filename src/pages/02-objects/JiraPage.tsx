import { useShallow } from "zustand/shallow";
import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {
  const pendingTasks = useTaskStore(
    useShallow((state) => state.getTasksByStatus("pending")),
  );
  const inProgressTasks = useTaskStore(
    useShallow((state) => state.getTasksByStatus("in-progress")),
  );
  const completedTasks = useTaskStore(
    useShallow((state) => state.getTasksByStatus("completed")),
  );

  console.log(pendingTasks, inProgressTasks, completedTasks);
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" value="pending" tasks={pendingTasks} />

        <JiraTasks
          title="Avanzando"
          value="in-progress"
          tasks={inProgressTasks}
        />

        <JiraTasks
          title="Terminadas"
          value="completed"
          tasks={completedTasks}
        />
      </div>
    </>
  );
};
