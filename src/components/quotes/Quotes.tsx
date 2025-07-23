'use client'
import { useGetQuotesQuery } from '@/store/features/quotes/quotesApiSlice'
import { useState } from 'react'
import styles from './Quotes.module.css'

const options = [5, 10, 20, 30]

export const Quotes = () => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(5)
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } = useGetQuotesQuery(numberOfQuotes)

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex place-content-center pt-48 ">
        <h1 className="text-colorText">Loading...</h1>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <h3>Select the Quantity of Quotes to Fetch:</h3>
        <select
          className={styles.select}
          value={numberOfQuotes}
          onChange={(e) => {
            setNumberOfQuotes(Number(e.target.value))
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {data.quotes.map(({ author, quote, id }) => (
          <blockquote key={id}>
            &ldquo;{quote}&rdquo;
            <footer>
              <cite>{author}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    )
  }

  return null
}
