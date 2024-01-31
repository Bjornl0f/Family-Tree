import React, { useState } from 'react';
//import Spinner from '../components/Spinner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useParams } from 'react-router-dom';

const DeleteModal = ({ person, onClose }) => {
  const [loading, setLoading] = useState(false);
  //const { id } = useParams();
  const handleDeleteModal = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3333/people/${person._id}`)
      .then(() => {
        setLoading(false);
        const notify = () => {
          toast.success("Person was successfully deleted!", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        };
        notify();
      })
      .catch((error) => {
        setLoading(false);
        const notify = () => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        };
        notify();
        console.log(error);
      })
  };

  return (
    <div
      className='fixed bg-slate-400 bg-opacity-70 top-0 bottom-0 left-0 right-0 border rounded-3xl z-10 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[10rem] h-[8rem] border flex flex-col items-center'
        >
        <p className='text-2xl'>Delete person</p>
      </div>
    </div>
  )
}

export default DeleteModal