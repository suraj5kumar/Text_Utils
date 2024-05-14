import 'regenerator-runtime/runtime'
import React from 'react'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const App = () => {
  const [text, settext] = useState("")
  const [countword, setcountword] = useState(0)
  const [statement, setstatement] = useState(0)
  const [question, setquestion] = useState(0)
  const [character, setcharacter] = useState(0)
  const [exclamations, setexclamations] = useState(0)
  const [time, settime] = useState(0)
  // Adding speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Hook to count words
  useEffect(() => {
    let str = text.trim()

    if (str == "") {
      setcountword(0)
    }
    else {
      const words = str.split(/\s+/)
      setcountword(words.length)
    }
  }, [text])

  // Hook to count characters
  useEffect(() => {
    let character = text;
    setcharacter(character.length)
  }, [text])

  // Hook count question marks
  useEffect(() => {
    let questionCount = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "?") {
        questionCount++
      }
    }
    setquestion(questionCount)
  }, [text])

  // Hook to count statements
  useEffect(() => {
    let statementCount = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "\n" || text[i] == ".") {
        statementCount++
      }
    }
    setstatement(statementCount)
  }, [text])

  // Hook to count exclamations
  useEffect(() => {
    let exclamationCount = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "!") {
        exclamationCount++
      }
    }
    setexclamations(exclamationCount)
  }, [text])


  // Hook to calculate time to read the inserted text
  useEffect(() => {
    if (text == "") {
      settime(0)
    }
    else {
      let timeToRead = 0.01 * character
      settime(timeToRead)
    }
  }, [text])

  // function to convert string into uppercase
  const uppercase = () => {
    let a = text
    let uppercase = a.toUpperCase()
    settext(uppercase)
  }

  // function to convert string into lowercase
  const lowercase = () => {
    let a = text
    let lowercase = a.toLowerCase()
    settext(lowercase)
  }

  // Creating Greg Dean's function to convert the string into sentencecase
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  };

  // Making function to convert string into sentencecase
  const sentencecase = () => {
    let a = text
    let lowercase = a.toProperCase()
    settext(lowercase)
  }

  // Function to encode into Base64
  const base64 = () => {
    let str = text
    // Using btoa to encode into base64
    let result = window.btoa(str)
    settext(result)
  }

  // Function to decode from Base64
  const decode64 = () => {
    let str = text
    // Using atob to decode from base64
    let result = window.atob(str)
    settext(result)
  }


  // function to clear all text from space
  const cleartext = () => {
    settext("")
  }

  // Function to extract numbers from texts
  const numbers = () => {
    let num = ""
    for (let i in text) {
      if (text[i] in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        num = num + text[i]
      }
    }
    settext(num)
  }

  // Function to extract only links from text
  const extractLinks = () => {
    const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi

    // Extract links from the text
    const links = text.match(urlRegex)

    settext(links ? links.join('\n') : '');
  }

  // Function to extract texts only form string
  const extractText = () => {
    let only_text = text.replace(/[^a-zA-Z]/g, '')
    settext(only_text)
  }

  // Function to remove white spaces
  const noWhiteSpace = () => {
    // let noWhiteSpace = text.replace(/\s/g, "")
    let noWhiteSpace = text.trim()
    settext(noWhiteSpace)
  }

  // Function to remove only special characters
  const noSpecialCharacters = () => {
    let onlyText = text.replace(/[^\w\s]/gi, "")
    settext(onlyText)
  }

  // Function to reverse the text
  const reversedText = () => {
    let reverse = [...text].reverse().join("")
    settext(reverse)
  }

  // Adding text in textarea through speech recognition
  useEffect(() => {
    settext(transcript)
  }, [transcript])

  // // Function to toggle listening from start to stop and stop to start
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    }
    else {
      SpeechRecognition.startListening()
    }
  }


  return (
    <>
      <div className=' px-5 pt-4'>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label text-5xl pb-3">Enter The Text To Analyze Below</label>
          <textarea onChange={(e) => settext(e.target.value)} value={text} className="form-control border-2 border-slate-700" id="exampleFormControlTextarea1" rows="15"></textarea>
        </div>



        <div className=' px-3'>
          <div className=' flex flex-wrap py-2 gap-2'>
            <button onClick={uppercase} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Convert to uppercase</button>
            <button onClick={lowercase} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Convert to lowercase</button>
            <button onClick={sentencecase} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Convert to sentencecase</button>
            <button onClick={base64} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Encode to base64</button>
            <button onClick={decode64} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Decode from base64</button>
            <button onClick={cleartext} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Clear Text</button>
            <button onClick={numbers} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Extract Numbers</button>
            <button onClick={extractLinks} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Extract Links</button>
            <button onClick={extractText} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Extract Text</button>
            <button onClick={noWhiteSpace} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Remove white space</button>
            <button onClick={noSpecialCharacters} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Remove Special Characters</button>
            <button onClick={reversedText} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button"> Reverse text</button>
            <button onClick={toggleListening} className=' px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 duration-200 text-xl text-white' type="button">{listening ? "Stop Listening" : "Start Listening"}</button>
          </div>

          <h1 className=' text-4xl font-black pt-2 pb-2'>Your Text Summary</h1>

          <div className='text-xl pb-3'>
            {countword} Words, {character} Characters , {statement} Statements , {question} Questions, {exclamations} exclamations.
          </div>

          <h4 className=' pb-3'>{time} Minutes read</h4>
        </div>

        <div className=' px-3'>
          <div className='text-4xl font-black pb-2'>Preview</div>
          <h1>{text ? text : "Nothing to preview!"}</h1>
        </div>
      </div>
    </>
  )
}

export default App