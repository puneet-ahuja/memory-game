import React, { useState } from 'react';

import PlayBoard from './../PlayBoard/playboard'
import HomePage from './../HomePage/homepage'

const MemoryGame = () => {
    const [started, setStarted] = useState(false)
    return started ?<PlayBoard /> : <HomePage setStarted={setStarted} />
}

export default MemoryGame