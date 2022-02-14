import s from "./App.module.css";
import { useState, useEffect } from "react";
import { Filters } from "./Filters";
import Chevron from "./Img/Chevron.png";
import Xicon from "./Img/Xicon.png";
import ok from "./Img/ok.svg";
import ko from "./Img/ko.svg";
import { TaskCreationForm } from "./TaskCreationForm";

const filters = {
  All: () => true,
  Completed: (task) => task.isDone === true,
  Active: (task) => task.isDone === false,

  
};

export const Form = () => {
  const [taskList, setTaskList] = useState([]);
  const [editTask, seteditTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const createTask = (taskName) => {
    setTaskList((prevValue) => [
      { id: Date.now(), text: taskName, isDone: false },
      ...prevValue,
    ]);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  };

  const taskRemover = (id) => {
    setTaskList((prevValue) => {
      return prevValue.filter((task) => {
        return task.id !== id;
      });
    });
  };

  const toggleDone = (taskId) => {
    setTaskList((prevValue) => {
      return prevValue.map((task) => {
        return task.id !== taskId ? task : { ...task, isDone: !task.isDone };
      });
    });
  };
  //jak to działa
  const clearComplated = () => {
    setTaskList((prevValue) => {
      return prevValue.filter((task) => {
        return !task.isDone; // task.isDone !== true
      });
    });
  };

  const enterEditMode = (taskId, value) => {
    seteditTask({ taskId, value });
  };

  function selectAll() {
    const shouldComplete = taskList.some((task) => {
      return !task.isDone;
    });
    const updateAll = taskList.map((task) => {
      return { ...task, isDone: shouldComplete };
    });
    setTaskList(updateAll);
  }


  // const selectAll= (taskId)=>{
  //   setTaskList((prevValue) => {
  //     return prevValue.map((task) => {
  //       return task.id !== taskId ? {...task, isDone:!task.isDone}: task 
  //         
  //     });

  return (
    <>
      <div className={s.shadow}>
        <div className={s.createTask}>
          {taskList.length > 0 ? (
            <img
              onClick={() => selectAll()}
              className={s.chevron}
              src={Chevron}
            ></img>
          ) : null}
          <TaskCreationForm onTaskNameReady={createTask} />
        </div>
        <div>
          {taskList.filter(filters[activeFilter]).map((task) => {
            return (
              <div key={task.id} className={s.task}>
                <div onClick={() => toggleDone(task.id)}>
                  {task.isDone === true ? (
                    <img className={s.imgStyle} src={ok}></img>
                  ) : (
                    <img className={s.imgStyle} src={ko}></img>
                  )}
                </div>
                <div>

                {task.isDone === false ? ( 
                  <p
                    style={{ position: "relative", left: "5px", top: "10px" }}
                    onDoubleClick={() => enterEditMode(task.id, task.text)}
                  >
                    {editTask !== null && editTask.taskId === task.id ? (
                      <input
                        value={editTask.value}
                        onChange={(e) => {
                          seteditTask({
                            taskId: task.id,
                            value: e.target.value,
                          });
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            setTaskList((all) =>
                              all.map((item) =>
                                item.id === task.id
                                  ? { ...item, text: editTask.value }
                                  : item
                              )
                            );
                            seteditTask(null);
                          }
                          if (event.key === "Escape") {
                            seteditTask(null);
                          }
                        }}
                      />
                    ) : (
                      task.text
                    )}
                  </p>

                  ): (<p style={{ position: "relative", left: "5px", top: "10px", textDecoration:"line-through", opacity:"0.3" }}> {task.text} </p> 
                  )}

                  <img
                    onClick={() => taskRemover(task.id)}
                    className={s.xicon}
                    src={Xicon}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
        <footer>
          {taskList.length > 0 ? (
            <Filters
              clearComplated={clearComplated}
              taskList={taskList}
              setActiveFilter={setActiveFilter}
              filters={filters}
              activeFilter={activeFilter}
            />
          ) : null}
        </footer>
      </div>
    </>
  );
};
