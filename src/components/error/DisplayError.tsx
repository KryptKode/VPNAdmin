import React from 'react';

interface DisplayErrorProps {
    message: string,
}

const DisplayError = ({ message }: DisplayErrorProps) => {
    return (
        <div className="error-wrapper">
            <p className='error-text'>{message}</p>
        </div>
    );
};

export default DisplayError;