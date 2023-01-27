import React, { useState } from 'react';
import data from './data-1'
export default function App() {
	const { questions } = data

	const [checkedState, setCheckedState] = useState(
		new Array(questions[6].choices.length).fill(false)
	);
	const [extraCheckedState, setExtraCheckedState] = useState(
		new Array(questions[7].choices.length).fill(false)
	);

	const [skillsArray, setSkillsArray] = useState([])
	const [extraArray, setExtraArray] = useState([])


	const handleOnChange = (position, event) => {
		console.log(event)
		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item
		);

		setCheckedState(updatedCheckedState);

		console.log(updatedCheckedState)

		updatedCheckedState.map((item, i) => {
			console.log(item)
			if (item === true) {
				setSkillsArray(prev => Array.from(new Set([...prev, questions[6].choices[position]])))
			}
		})

	};

	const handleOnChangeExtra = (position, event) => {
		console.log(event)
		const updatedCheckedState = extraCheckedState.map((item, index) =>
			index === position ? !item : item
		);

		setExtraCheckedState(updatedCheckedState);


		updatedCheckedState.map((item, i) => {
			console.log(item)
			if (item === true) {
				setExtraArray(prev => Array.from(new Set([...prev, questions[6].choices[position]])))
			}
		})

	};


	const [input, setInput] = useState({
		email: '',
		age: '',
		gender: '',
		jobLocation: '',
		salary: '',
		qualification: '',
		photo: '',
		cv: ''
	})
	console.log(input)

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [showScore, setShowScore] = useState(false)



	const handleNextClick = () => {
		const nextQuestion = currentQuestion + 1
		if (nextQuestion < questions.length) {
			setCurrentQuestion(prevState => prevState + 1)
		}

		if (currentQuestion === 9) {
			setShowScore(true)
		}
	}
	const handlePreviousClick = () => {
		const previousQuestion = currentQuestion - 1
		if (previousQuestion > -1) {
			setCurrentQuestion(prevState => prevState - 1)
		}
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		setInput(prevState => {
			return { ...prevState, [name]: value }
		})
	}
	console.log(input)


	const inputQts = () => {
		let id = questions[currentQuestion].id
		if (id === 90) return <input required onChange={handleChange} value={input.email} type='email' name='email' />
		if (id === 91) return <input onChange={handleChange} value={input.age} type='number' name='age' />

		if (id === 92) {
			return <div className='radio-container'>
				{questions[currentQuestion].choices.map(item =>
					<div key={item.id} className='single-radio'>
						<input
							required
							type="radio"
							id="unemployed"
							value={item.choice_text}
							name='gender'
							onChange={handleChange}
						/>
						<label htmlFor="unemployed">{item.choice_text}</label>

					</div>)
				}
			</div>
		}

		if (id === 93) {
			return <div className='radio-container'>
				{questions[currentQuestion].choices.map(item =>
					<div key={item.id} className='single-radio'>
						<input
							required
							type="radio"
							id="unemployed"
							value={item.choice_text}
							name='gender'
							onChange={handleChange}
						/>
						<label htmlFor="unemployed">{item.choice_text}</label>
						<br />
					</div>)
				}
			</div>
		}

		if (id === 94) return <div className="formInput">

			<select
				id="favColor"
				value={input.salary}
				onChange={handleChange}
				name="salary"
				required
			>
				{questions[currentQuestion].choices.map((option) => (
					<option value={option.choice_text} key={option.id}>
						{option.choice_text}
					</option>
				))}
			</select>
		</div>


		if (id === 95) return <div className="formInput">

			<select
				id="favColor"
				value={input.qualification}
				onChange={handleChange}
				name="qualification"
				required
			>
				{questions[currentQuestion].choices.map((option) => (
					<option value={option.choice_text} key={option.id}>
						{option.choice_text}
					</option>
				))}
			</select>
		</div>


		if (id === 96) {
			return <div className="radio-container">
				{questions[currentQuestion].choices.map(({ choice_text }, index) => {
					return (
						<div key={index} className='single-radio'>
							<input
								type="checkbox"
								id={`custom-checkbox-${index}`}
								name={choice_text}
								value={choice_text}
								checked={checkedState[index]}
								onChange={() => handleOnChange(index)}
								required
							/>
							<label htmlFor={`custom-checkbox-${index}`}>{choice_text}</label>
						</div>
					);
				})}

			</div>
		}

		if (id === 97) {
			return <div className="radio-container">
				{questions[currentQuestion].choices.map(({ choice_text }, index) => {
					return (
						<div key={index} className='single-radio'>
							<input
								type="checkbox"
								id={`custom-checkbox-${index}`}
								name={choice_text}
								value={choice_text}
								checked={extraCheckedState[index]}
								onChange={() => handleOnChangeExtra(index)}
								required
							/>
							<label htmlFor={`custom-checkbox-${index}`}>{choice_text}</label>
						</div>
					);
				})}

			</div>
		}


		if (id === 98) return <input required onChange={handleChange} value={input.photo} type='file' name='photo' accept="image/png, image/jpeg" />
		if (id === 99) return <input required onChange={handleChange} value={input.cv} type='file' name='cv'
			accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		/>
	}



	return (
		<div className='app'>

			{showScore ? (
				<div className='result-container'>
					<h1>Thanks for submitting the form...</h1>
					<div>
						<p>Your Details</p>
						<ul>
							<li>Email: <span>{input.email}</span></li>
							<li>Age: <span>{input.age}</span></li>
							<li>Gender: <span>{input.gender}</span></li>
							<li>Job Location:<span>{input.jobLocation}</span></li>
							<li>Salary: <span>{input.salary}</span></li>
							<li>Qualification: <span>{input.qualification}</span></li>
							<li>Skills:  <span>{skillsArray.map(s => <p>{s.choice_text}</p>)}</span></li>
							<li>Extra Skills: {extraArray.map(s => <p>{s.choice_text}</p>)}</li>
							<li>Photo: {input.photo}</li>
							<li>CV: {input.cv}</li>
						</ul>
					</div>

					{/* <button onClick={handleReset}>Reset Quiz</button> */}
				</div>
			) : (
				<div className='container'>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].question_text}</div>
					</div>




					{/* {questions[currentQuestion].question_type === 4 && <input
						onChange={handleChange}

					/>}
					 */}
					{inputQts()}


					{/* <div>
						<input type="text" />
					</div> */}





					<div className='answer-section'>
						{/* {questions[currentQuestion].map(item => (
							<button onClick={() => handleClick(item.isCorrect)} key={item.answerText}>{item.answerText}</button>
						))} */}
						<button onClick={handlePreviousClick}>Previous</button>
						<button onClick={handleNextClick}>{currentQuestion === 9 ? 'Submit' : 'Next'}</button>
					</div>
				</div>
			)}
		</div>
	);
}


