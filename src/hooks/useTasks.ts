import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interface/task.interface";

interface Props {
  value: TaskStatus;
}

export const useTasks = ({ value }: Props) => {
  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const resp = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      theme: "auto",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "debe ingresar un nombre para la tarea";
      },
    });

    if (resp.isConfirmed && resp.value) {
      addTask(resp.value, value);
    }
  };

  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const addTask = useTaskStore((state) => state.addTask);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(value);
  };

  return {
    //properties
    onDragOver,
    isDragging,

    //methods
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
