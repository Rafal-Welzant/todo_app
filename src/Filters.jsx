import s from "./App.module.css";
export const Filters = (props) => {
  const {setActiveFilter} = props
  const {activeFilter} = props
  
  
  
  
 
  return (
  
    <div className={s.nav}>
      <p style={{position:"relative", left:"-70px"}}>{props.taskList.length} {props.taskList.length < 2 ? "item" :"items" } left</p>
        
          <div className={s.filter}>
            
            <button  onClick={() => setActiveFilter("All")}>All </button>
            <button onClick={() => setActiveFilter("Completed")}>Comleted</button>
            <button onClick={() => setActiveFilter("Active")}>Active</button>
          </div>
          
          <button className={s.clearButton} onClick={()=>props.clearComplated()}>Clear completed</button>
          
    </div>
  );
};
