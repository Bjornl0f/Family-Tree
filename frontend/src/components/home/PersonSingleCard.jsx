import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImUserPlus } from "react-icons/im";
import PropTypes from 'prop-types';
import PersonModal from './PersonModal';

//const photo = "https://fmi.chnu.edu.ua/media/bv1jq2nj/img_4877.jpg?format=webp&quality=80&v=1d99495d4638470"

const PersonSingleCard = ({ person }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOnClose = () => setShowModal(false);

  if (!person) {
    return (
      <div className='relative bg-gray-300 bg-opacity-60 border-4 border-black p-4 m-10 w-44 h-56 rounded-xl hover:shadow-2xl hover:scale-110 transition ease-in-out duration-150'>
        <div className='flex flex-col items-center p-4'>
          <Link to={`/people/create`}>
            <ImUserPlus className='text-5xl' />
          </Link>
          <h3 className='text-xl font-medium pt-4 text-center'>Add your first person</h3>
        </div>
      </div>
    );
  }

  const { firstName, lastName, photo, birthDate, deathDate } = person;
  // Assuming birthDate comes as a string from your API response
  const apiBirthDateString = birthDate;
  const apiBirthDate = new Date(apiBirthDateString);

  return (
    <div className='relative m-10 w-44 h-56'>
      <div 
        className='bg-gray-300 bg-opacity-60 border-4 border-black rounded-xl p-6 hover:shadow-2xl hover:scale-110 cursor-pointer' 
        onClick={() => setShowModal(true)}
        >
        <div className='flex flex-col items-center'>
          {photo ? (
            <img src={photo} alt="Person photo" className="rounded-full mb-4 w-1/2" />
          ) : (
            <ImUserPlus className="text-5xl" />
          )}
          <h3 className='text-xl font-medium pt-4'>{firstName} {lastName}</h3>
          <h4 className='pt-4'>{apiBirthDate instanceof Date ? apiBirthDate.getFullYear() : 'Invalid Date'} - </h4>
        </div>
      </div>
      {showModal && (
        <PersonModal person={person} onClose={handleOnClose} />
      )}
    </div>
  );
}

PersonSingleCard.propTypes = {
  person: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.instanceOf(Date),
    deathDate: PropTypes.instanceOf(Date),
    photo: PropTypes.string,
  }),
};

export default PersonSingleCard