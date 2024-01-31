import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonCard from '../components/home/PersonCard';
import Navbar from '../components/home/Navbar/Navbar';
import bgImg from '../components/home/family-tree31.png';
//import Spinner from '../components/Spinner';
//import { AiOutlineEdit } from 'react-icons/ai';
//import { BsInfoCircle } from 'react-icons/bs';
//import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
//import BranchCard from '../components/home/BranchCard';
//import BranchTable from '../components/home/BranchTable';

const Home = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [showType, setShowType] = useState('table');
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3333/people')
      .then((response) => {
        console.log(response);  // Log the entire response
        const responseData = response.data;

        if (responseData && typeof responseData === 'object') {
          const peopleArray = Object.values(responseData);
          setPeople(peopleArray);
        } else {
          console.error('Invalid response format:', responseData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching branches:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='h-[100rem]'>
      <div className='w-full bg-black/50 h-[100dvh] flex flex-col items-center justify-center'>
        <img src={bgImg} alt="Image" className='w-full h-full object-cover absolute mix-blend-overlay'/>
        <p className='text-6xl font-bold text-white z-10'>Welcome to Djan Tree!</p>
      </div>
      <Navbar/>
      <div className=''>
        <PersonCard people={people}/>
      </div>
    </div>
  );
};

export default Home