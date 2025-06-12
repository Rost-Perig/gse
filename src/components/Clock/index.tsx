'use client'

import { useState, useEffect } from 'react'

export const Clock = () => {
  const [time, setTime] = useState('')
  const [today, setToday] = useState('')

  useEffect(() => {
    calendar()
    timer()
  }, [])

  const timer = () =>
    setInterval(() => {
      const date = new Date()
      setTime(date.toString().slice(16, 24))
      // toDateString()
    }, 1000)

  const calendar = () => {
    const now = new Date()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = [
      'January',
      'february',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const date = (now.getDate() < 10 ? '0' : '') + now.getDate()
    const year = now.getFullYear() < 1000 ? now.getFullYear() + 1900 : now.getFullYear()
    setToday(days[now.getDay()] + ', ' + date + ' ' + months[now.getMonth()] + ' ' + year)
  }

  return (
    <div className="flex flex-col p-1 border border-solid border-colorBorder">
      <p className="italic text-xs font-light text-colorText">{today}</p>
      <p className="text-base font-semibold text-center text-colorTextLight">{time}</p>
    </div>
  )
}
