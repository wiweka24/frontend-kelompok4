import { Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { EditIcon, ExecutionIcon, CategoryIcon, DeleteIcon } from '../img'
import { URI, axiosInstance, dict } from './component-config';
import Confirm from './confirmation';

export default function Modal({isVisible, onClose, actToShow}) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [colorStatus, setColorStatus] = useState([])
  const URL = URI + "/activity/" + actToShow.act._id

  useEffect(() => {  
    setColorStatus(dict[actToShow.act.actStatus])
  }, [actToShow])

  const handleClose = (e) => {
    if( e.target.id === 'wrapper') onClose();
  }
  
  const handleClick = async (status) => {
    try{
      const res = await axiosInstance.patch(URL,  
        {
          actStatus: status,
        })
        setColorStatus(dict[status])
        
      } catch (err) {
        console.error(err.response.data);
        alert(err.response.data.error)
      }
    }

    
    const handleDelete = async () => {
      try{
        const res = await axiosInstance.delete(URL)
        console.log(res.data)
        onClose()
        
      } catch (err) {
        console.error(err.response.data);
        alert(err.response.data.error.toString())
      }
    };
    
    if( !isVisible ) return null

  return (
    <Fragment>
    <div 
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-30'
      id='wrapper' 
      onClick={handleClose}>
      <div className='w-3/5 h-full flex flex-col'>

        <button className="text-white text-xl place-self-end" onClick={() => onClose()}>X</button>
        <div className='overflow-auto bg-white p-6 rounded-3xl'>

          <div className="py-6 px-3 text-star mx-auto items-center justify-center">
            <div className={"flex justify-between font-bold text-2xl text-white w-full py-8 px-6 rounded-xl " + colorStatus}>
              <div>
                {actToShow.act.actName}
              </div>
              <div className='relative flex items-center'>
                <Link to='/form-edit' state={{ actToShow }}>
                    <div className="ml-2 w-8 h-8 active:scale-[0.98]">
                        <EditIcon/>
                    </div>
                </Link>
                <button>
                  <div className="ml-2 w-8 h-8 active:scale-[0.98]"
                       onClick={() => setShowConfirm(true) }>
                    <DeleteIcon/>
                  </div>
                </button> 
              </div>
            </div>
              <p className='text-lg text-black text-left mt-3'>
                {actToShow.act.actDescription}
              </p>
            </div>

            <div className="flex bg-white w-full pb-4 pt-2 border-none"> 
              <div className="flex">
                <div className="text-blue-500 ml-2 w-12 h-12">
                  <ExecutionIcon/>
                </div>
              </div>
              <div>
                <p className="flex text-left px-6 text-xl font-medium">Execution Date</p>
                <p className="px-6 text-sm font-normal">
                  {actToShow.act.actDate}
                </p>
              </div>
            </div>

            <div className="flex bg-white w-full py-4 border-none"> 
              <div className="flex">
                <div className="text-blue-500 ml-2 w-12 h-12">
                  <CategoryIcon/>
                </div>
              </div>
              <div>
                <p className="flex text-left px-6 text-xl font-medium">Category</p>
                <p className="px-6 text-sm font-normal">
                  {actToShow.act.actCategory}
                </p>
              </div>
            </div>

            <div className="flex bg-white w-full py-4 border-none"> 
            <div>
              <p className="flex px-6 text-xl font-medium">Activity's Status</p>
              <div className="mt-2 flex px-5">
                <button 
                  onClick={() => handleClick('2-todo')} 
                  className='mr-2 active:scale-[0.98] py-1.5 px-3 rounded-lg bg-red-500 text-base text-black hover:bg-red-400 duration-500 font-semibold'>
                  To Do
                </button>
                <button
                  onClick={() => handleClick('1-ongoing')} 
                  className='mr-2 active:scale-[0.98] py-1.5 px-3 rounded-lg bg-yellow-500 text-base text-black hover:bg-yellow-400 duration-500 font-semibold'>
                  On Going
                </button>
                <button 
                  onClick={() => handleClick('3-done')} 
                  className='mr-2 active:scale-[0.98] py-1.5 px-3 rounded-lg bg-green-500 text-base text-black hover:bg-green-400 duration-500 font-semibold'>
                  Done
                </button>           
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <Confirm 
      isVisible={showConfirm} 
      onClose={() => setShowConfirm(false)}
      text = "Delete Activity"
      loc = {handleDelete}>      
    </Confirm>

    </Fragment>
  )
}