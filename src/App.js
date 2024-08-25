import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [inputData, setInputData] = useState('');
    const [result, setResult] = useState({ numbers: [], alphabets: [] });
    const [showNumbers, setShowNumbers] = useState(true);
    const [showAlphabets, setShowAlphabets] = useState(true);

    const rollNumber = '21BIT0101'; // Your roll number

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://backend-flask-x2a9.vercel.app/bfhl', {
                data: inputData
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'numbers') {
            setShowNumbers(checked);
        } else if (name === 'alphabets') {
            setShowAlphabets(checked);
        }
    };

    return (
        <div>
            <header>
                <h1>Roll Number: {rollNumber}</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputData}
                    onChange={handleInputChange}
                    placeholder="Enter comma-separated values"
                />
                <button type="submit">Submit</button>
            </form>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="numbers"
                        checked={showNumbers}
                        onChange={handleCheckboxChange}
                    />
                    Show Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="alphabets"
                        checked={showAlphabets}
                        onChange={handleCheckboxChange}
                    />
                    Show Alphabets
                </label>
            </div>

            <div>
                <h2>Results:</h2>
                {showNumbers && result.numbers.length > 0 && (
                    <div>
                        <h3>Numbers:</h3>
                        <ul>
                            {result.numbers.map((number, index) => (
                                <li key={index}>{number}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {showAlphabets && result.alphabets.length > 0 && (
                    <div>
                        <h3>Alphabets:</h3>
                        <ul>
                            {result.alphabets.map((alphabet, index) => (
                                <li key={index}>{alphabet}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
