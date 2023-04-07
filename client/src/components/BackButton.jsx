import React from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-inherit px-3 pt-3"
    >
      <button
        type="button"
        className="text-4xl cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <BsFillArrowLeftCircleFill />
      </button>
    </div>
  );
}

export default BackButton;
