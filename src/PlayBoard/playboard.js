import React, { useState } from 'react'
import classnames from 'classnames'

import './playboard.css'

var categoryMap = {
    'apple': 'apple-card',
    'apple_dark': 'apple-dark-card',
    'apple_empty': 'apple-empty-card',
    'lemon': 'lemon-card',
    'orange': 'orange-card',
    'orange_dark': 'orange-dark-card',
    'watermelon': 'watermelon-card',
    'watermelon_dark': 'watermelon-dark-card'
}

let selectedCard = undefined
let clickEnabled = false
let initilized = false
let intervalId = undefined

const initilizeData = () =>{
    const output =[
        {
            id: 0,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 1,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 2,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 3,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 4,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 5,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 6,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 7,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 8,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 9,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 10,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 11,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 12,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 13,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 14,
            visibility: 'visible',
            sideVisible: 'front'
        },{
            id: 15,
            visibility: 'visible',
            sideVisible: 'front'
        }
    ]
    const categoryList = ['apple','apple_dark','apple_empty','watermelon_dark','watermelon','orange_dark','orange','lemon']
    categoryList.forEach((item)=>{
        let randomNumber  = Math.floor(Math.random()* 16)
        while(output[randomNumber].card){
            randomNumber = (randomNumber + 1) % 16
        }
        output[randomNumber].card = categoryMap[item]
    })
    categoryList.forEach((item)=>{
        let randomNumber  = Math.floor(Math.random()* 16)
        while(output[randomNumber].card){
            randomNumber = (randomNumber + 1) % 16
        }
        output[randomNumber].card = categoryMap[item]
    })
    return output
}

const getTime = (timer) => {
    const sec = timer % 60
    const min = parseInt(timer / 60)
    return (min>9 ? min: "0" + min) + " : " + (sec >9 ? sec: "0" + sec)
}

const scoreMap = (matches,count,timer) => [
    {
        title: 'Matches',
        value: matches
    },{
        title: 'Turns',
        value: count
    },{
        title: 'Time',
        value: getTime(timer)
    },
]

const KeyValue = ({title,value}) =>{
    return (
        <div className="keyValueContainer">
            <div className="key">{title}</div>
            <div>{value}</div>
        </div>
    )
}

const Board = ({cardClickHandler, elements}) => {
    return elements.map((item) => {
        return <Card key={item.id} item={item} cardClickHandler={cardClickHandler} />
    })
}

const WinnerCard = ({onStartAgainClick}) => {
    return (
        <div className="winner-container">
            <div className="winner">You Win</div>
            <div className="start-button" onClick={onStartAgainClick}> Play Again</div>
        </div>
    )
}

const Card = ({item, cardClickHandler}) => {
    const cardClasses = classnames('card', {
        'hidden-card': item.visibility === 'hidden',
        'back-card': item.visibility === 'visible' && item.sideVisible === 'back',
        [`${item.card}`] : item.visibility === 'visible' && item.sideVisible === 'front'
    })
    return(
        <div className={cardClasses} onClick={()=>cardClickHandler(item.id)}/>
    )
}

const PlayBoard = () => {
    const [elements, setElements] = useState(initilizeData())
    const [matches, setMatches] = useState(0)
    const [count, setCount] = useState(0)
    const [won, setWon] = useState(false)
    const [timer, setTimer] = useState(0)


    const incrementTimer = () => {
        setTimer((prevTimer) => prevTimer + 1)}
 

    const startTimer = () =>{
        if(!intervalId){
            intervalId = setInterval( () => incrementTimer(), 1000)
        }
    }
    startTimer()

    const initilize = () => {
        selectedCard = undefined
        clickEnabled = false
        initilized = false
        intervalId = undefined
    
        setElements(initilizeData())
        setMatches(0)
        setCount(0)
        setWon(false)
        setTimer(0)
    }

        
    const hideElements = (indexArray) =>{
        let newElements = [...elements]
        indexArray.forEach((index) =>{
            newElements[index].visibility = 'hidden'
        })
        setElements(newElements)
        clickEnabled = true
        selectedCard = undefined
    }

    const flipBackElements = (indexArray) =>{
        let newElements = [...elements]
        indexArray.forEach((index) =>{
            newElements[index].sideVisible = 'back'
        })
        setElements(newElements)
        clickEnabled = true
        selectedCard = undefined
    }

    const flipAll = () => {
        let newElements = [...elements]
        newElements.forEach((item, index) =>{
            newElements[index].sideVisible = 'back'
        })
        setElements(newElements)
        clickEnabled = true      
    }

    const cardClickHandler = (index)=>{
        if(elements[index].visibility === 'hidden' || (elements[index].visibility === 'visible' && elements[index].sideVisible === 'front') || !clickEnabled){
            return
        }
        if(!selectedCard){
            selectedCard = elements[index]
            let newElements = [...elements]
            newElements[index] = {
                id : elements[index].id,
                visibility : 'visible',
                sideVisible : 'front',
                card : elements[index].card
            } 
            setElements(newElements)
        }
        else{
            let newElements = [...elements]
            newElements[index] = {
                id: elements[index].id,
                visibility: 'visible',
                sideVisible: 'front',
                card : elements[index].card
            } 
            setElements(newElements)
            clickEnabled = false
            if(selectedCard.card === elements[index].card){
                setMatches(matches + 1)
                // Login After Match Win
                if(matches === 7){
                    setWon(true)
                    clearInterval(intervalId)
                }
                setTimeout(()=>hideElements([index,selectedCard.id]),1000)
            }
            else{
                setTimeout(()=>flipBackElements([index,selectedCard.id]),1000)
            }
            setCount(count + 1)
        }   
    }

    if(!initilized){
        setTimeout(()=>flipAll(),2000)
        initilized =true
    }

    return (
        <div className='background-container'>
            <div className="score-menu">
                {scoreMap(matches,count,timer).map((item,key)=><KeyValue key={key} {...item} />)}
            </div>
            <div className="playground"> 
                {won? <WinnerCard onStartAgainClick={initilize}/>:<Board cardClickHandler={cardClickHandler} elements={elements}/>}
            </div>
        </div>
    )
}

export default PlayBoard