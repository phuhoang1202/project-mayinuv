import React, { useState, useEffect } from 'react'

const CountdownTimer = ({ initialTime }) => {
  const calculateTimeLeft = () => {
    const difference = initialTime - new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time
  }

  return (
    <span>
      {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
    </span>
  )
}

export default CountdownTimer
