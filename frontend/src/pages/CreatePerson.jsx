import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';

const CreatePerson = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [birthPlace, setBirthPlace] = useState({ country: '', city: '' });
  const [deathPlace, setDeathPlace] = useState('');
  const [photo, setPhoto] = useState('');
  const [relations, setRelations] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSavePerson = () => {
    if (!firstName || !lastName || !gender || !birthDate || !birthPlace) {
      toast.error("Please fill in all required fields", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    const data = {
      firstName,
      lastName,
      gender,
      birthDate: new Date(birthDate),
      deathDate: deathDate ? new Date(deathDate) : null,
      birthPlace: {
        country: birthPlace.country,
        city: birthPlace.city || null, // Assuming city is optional
      },
      deathPlace,
      photo,
      relations: relations ? relations.split(',').map(relation => relation.trim()) : [],
    };
    setLoading(true);
    axios
      .post('http://localhost:3333/people', data)
      .then(() => {
        setLoading(false);
        const notify = () => {
          toast.success("Person was successfully created", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
        };
        notify();
        navigate('/');
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
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Create person</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Birth Date</label>
          <input
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Death Date</label>
          <input
            type="text"
            value={deathDate}
            onChange={(e) => setDeathDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Birth Place</label>
          <div className="flex">
            <input
              type="text"
              value={birthPlace.country}
              onChange={(e) => setBirthPlace({ ...birthPlace, country: e.target.value })}
              className='border-2 border-gray-500 px-4 py-2 w-full mr-2'
            />
            <input
              type="text"
              value={birthPlace.city}
              onChange={(e) => setBirthPlace({ ...birthPlace, city: e.target.value })}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Death Place</label>
          <input
            type="text"
            value={deathPlace}
            onChange={(e) => setDeathPlace(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Photo</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500'>Relations</label>
          <input
            type="text"
            value={relations}
            onChange={(e) => setRelations(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8 hover:opacity-90' onClick={handleSavePerson}>
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreatePerson