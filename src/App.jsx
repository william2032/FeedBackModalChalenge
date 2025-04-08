import React, {useEffect, useRef, useState} from 'react';

const App = () => {

    const rates = [{
        scores: [{'id': 1, 'score': 1,},
            {'id': 2, 'score': 2,},
            {'id': 3, 'score': 3,},
            {'id': 4, 'score': 4,},
            {'id': 5, 'score': 5,},
            {'id': 6, 'score': 6,},
            {'id': 7, 'score': 7,},
            {'id': 8, 'score': 8,},
            {'id': 9, 'score': 9,},
            {'id': 10, 'score': 10,},
        ]
    }];

    const [message, setMessage] = useState(" ");
    const [showMessage, setShowMessage] = useState(true);
    const [modal, setModal] = useState(null);
    const [count, setCount] = useState(0);
    const modalRef = useRef(null);

    useEffect(() => {
        const clickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModal(false); // Close modal if clicked outside
            }
        };

        document.addEventListener('mousedown', clickOutside);
        return () => document.removeEventListener('mousedown', clickOutside);
    }, []);


    const submitFeedback = () => {

        if (count >= 1) {
            const newMessage = `You rated us ${count}/10. Thank you!`;
            localStorage.setItem("feedback", newMessage);
            setMessage(newMessage);
            setShowMessage(true);
            setModal(false);
        } else {
            alert("Please select a rating of 1 or more.");
        }
    }

    useEffect(() => {
        const savedMessage = localStorage.getItem("feedback");
        if (savedMessage) {
            setMessage(savedMessage);
        }
    }, []);

    return (
        <div className=" fixed inset-0 bg-purple-100 flex items-center justify-center min-h-screen z-50 ">
            {modal ? (
                <div ref={modalRef}
                     className='relative bg-[#1a1831] p-10 sm:p-14 shadow-lg w-[90%] max-w-lg rounded-[15px] text-[#fbfcfe] '>
                    <h1 className='font-bold text-lg sm:text-2xl m-8 w-[200px] md:w-full  text-center'>How likely are you to rate
                        Teach2Give?</h1>
                    <button className='absolute text-2xl top-2 right-6 cursor-pointer  hover:text-blue-700'
                            onClick={() => (setModal(null))}>x
                    </button>


                    <ul className="text-gray-500 grid grid-rows-2 lg:grid-rows-1 lg:grid-flow-col gap-2 justify-center w-[100px] md:w-full">

                    {/*map the rate scores*/}
                        {rates[0].scores.map((score) => (

                            <li key={score.id} onClick={() =>
                                setCount(score.score)}
                                className={` transition duration-150  font-bold text-[12px] py-2 px-4 border  cursor-pointer rounded shadow grid-rows-2 ${
                                    count === score.score
                                        ? 'bg-blue-500 border-blue-700 text-white'
                                        : 'text-[#fbfcfe] border-gray-400 hover:border-blue-500'
                                }`}>
                                {score.score}
                            </li>
                        ))}
                    </ul>

                    <div className='text-[12px] flex   justify-between font-bold  mt-2 px-4 '>
                        <span className=" hidden lg:flex text-[12px] font-bold  text-[#fbfcfe]">Not likely at all</span>
                        <span className="hidden  lg:flex text-[12px] font-bold  text-[#fbfcfe]">Extremely likely</span>
                    </div>

                    <div className='flex  justify-between font-bold  mt-8 '>
                        {/*close the modal on clicking cancel*/}
                        <button onClick={() => (setModal(false))}
                                className='cursor-pointer bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-1 px-4 md:py-2 md:px-8 border border-blue-500  transition duration-150  hover:border-transparent rounded'>cancel
                        </button>
                        {/*call the submitFeedback function*/}
                        <button onClick={() => (submitFeedback())}
                                className='cursor-pointer bg-blue-400 text-blue-700 font-semibold hover:text-whitepy-1 px-4 md:py-2 border border-blue-500  transition duration-150  hover:border-transparent rounded'>Submit
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <button onClick={() => (setModal(true))}
                            className='cursor-pointer bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500  transition duration-150  hover:border-transparent rounded feedbutton'>GIVE
                        US YOUR FEEDBACK
                    </button>
                    <div className=' mt-4 space-y-4'>
                        {showMessage && (
                            <div className="mb-4 text-center text-[14px] text-red-700">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
