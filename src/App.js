import s from "./App.module.css";
import { Form } from "./Form";


export const App = () => {
  return (
    <>

      <h1 className={s.todos}>todos</h1>
      <div className={s.container}>
        <div>
          <Form className={s.todo}/>
        </div>

        
      </div>
    </>
  );
};
