export const Column = (props) => {

  const dragStartHandler = (e, task)=>{
    props.setDraggedTaskId(task.id);
    
  }
  const dropHandler = (e, status) => {
    e.preventDefault(); 
    e.stopPropagation();
    console.log('Dragged Task ID:', props.draggedTaskId);
    const cardElement = e.target.closest('.card');
    if (cardElement) {
      cardElement.style.boxShadow = 'none';
    }
    props.changeStatus(props.draggedTaskId, status)
  }
  
  const onDragBoard =(e, status)=>{
    console.log('Dragged Task ID:', props.draggedTaskId);
    props.changeStatus(props.draggedTaskId, status)
  }
  
  function formatDate(dateString) {
    const currentTime = new Date();
    const openedTime = new Date(dateString);
    
    const timeDiff = currentTime.getTime() - openedTime.getTime();
    
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if(daysAgo===0){
      return `opened today`;
    }
    return `opened ${daysAgo} days ago`;
  }
  return (
    
    <div className='col bg-red d-flex flex-column'>
      
      <h1>{props.statusName}</h1>
      <div className='bg-secondary overflow-auto m-1 p-2 flex-grow-1'
      onDragOver={(e)=>e.preventDefault()}
      onDrop={(e)=>onDragBoard(e, props.statusValue)}>
      {Array.isArray(props.tasks) && props.tasks.filter((task)=>task.state===props.statusValue).map((task)=>(
        <div key={task.created_at} data-testid='issue-item' className='card m-3'
        onDragOver={(e)=>e.preventDefault()}
        onDragLeave={(e)=>e.preventDefault()}
        onDragStart={(e)=>dragStartHandler(e, task)}
        onDragEnd={(e)=>e.preventDefault()}
        onDrop={(e) => dropHandler(e, props.statusValue)}
        draggable={true}>
          <div className='card-body'>
          <h5 className='card-title'>{task.title}</h5>
          <p className="card-text">#{task.number} {formatDate(task.created_at)}</p>
          <div>
          <small className='text-body-secondary'>{task.user.login}</small>
          <span className="mx-2">|</span>
          <small className='text-body-secondary'>Comments:{task.comments}</small>
          </div>
          </div>
        </div>
      ))}
      </div>
    
    </div>
  )
}
