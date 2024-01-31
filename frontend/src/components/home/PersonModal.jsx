import React, { useState } from 'react';
import { TbDots } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const PersonModal = ({ person, onClose }) => {
  const { firstName, lastName, photo, birthDate, deathDate } = person;

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const backgroundImageUrl = './tree-branch.jpg';
  const handleOnClose = () => setShowDeleteModal(false);

  return (
    <div
      className='fixed bg-black bg-opacity-70 backdrop-blur-sm top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => {event.stopPropagation(), isDropdownOpen && setDropdownOpen(!isDropdownOpen)}}
        className='w-[350px] max-w-full h-[500px] bg-white rounded-3xl p-4 flex flex-col justify-center items-center relative shadow-xl'
        style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover' }}
      >
        <div className='absolute top-6 right-6 z-10'>
          <button 
            id="dropdownButton" 
            data-dropdown-toggle="dropdown"
            type="button"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
            <TbDots className='text-4xl text-slate-600 p-1 cursor-pointer rounded-xl hover:bg-gray-100'/>
          </button>
          
          <div 
            id="dropdown" 
            className={`${isDropdownOpen ? 'block' : 'hidden'} absolute shadow-xl rounded-lg w-28 bg-slate-100`}            >
              <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <Link to={`/people/details/${person._id}`}>
                  <p className='px-3 py-1 hover:bg-gray-200'>Details</p>
                </Link>         
              </li>
              <li>
                <Link to={`/people/edit/${person._id}`}>
                  <p className='px-3 py-1 hover:bg-gray-200'>Edit</p>
                </Link>
              </li>
              <li>
                <p 
                  className='px-3 py-1 text-red-600 hover:bg-gray-200'
                  onClick={() => setShowDeleteModal(true)}
                  >Delete</p>
              </li>
              </ul>
              
          </div>

        </div>

        {showDeleteModal && (
          <DeleteModal person={person} onClose={handleOnClose}/>
        )}
        <div className='relative pt-6 flex flex-col items-center'>
          {photo ? (
            <img src={photo} alt="Person photo" className="rounded-full mb-4 w-1/2" />
          ) : (
            <FaPlus className="text-xl rounded-full border w-[100px] h-[100px] p-6" />
          )}
        </div>
        <div className='flex flex-col items-center m-4 border h-full'>
          <h2 className='text-3xl font-bold'>
            {firstName} {lastName}
          </h2>
          <h2>
            {birthDate}
          </h2>
        </div>
      </div>
    </div>
  )
}

PersonModal.propTypes = {
  person: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.instanceOf(Date),
    deathDate: PropTypes.instanceOf(Date),
    photo: PropTypes.string,
    _id: PropTypes.number,
  }),
  onClose: PropTypes.func,
};

export default PersonModal