import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

import {
  counterSelector,
  incrementAsync,
  incrementByAmount,
  increment,
  decrement,
} from '@/redux/features/counter/slice';
import { setUserName } from '@/redux/features/user/slice';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [incrementAmount, setIncrementAmount] = useState(2);
  const dispatch = useDispatch();
  const { value: count } = useSelector(counterSelector);
  // useEffect(() => {
  //   if (count >= 10) {
  //     dispatch(
  //       setUserName({
  //         name: 'Vincent Pham',
  //         age: 26,
  //       }),
  //     );
  //   }
  // }, [count]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {/* <SimpleButton className="mt5" /> */}
        <div>
          <div className={styles.row}>
            <button
              className={styles.button}
              aria-label="Increment value"
              onClick={() => dispatch(increment())}>
              +
            </button>
            <span className={styles.value}>{count}</span>
            <button
              className={styles.button}
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}>
              -
            </button>
          </div>
          <div className={styles.row}>
            <input
              className={styles.textbox}
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <button
              className={styles.button}
              onClick={() =>
                dispatch(incrementByAmount(Number(incrementAmount) || 0))
              }>
              Add Amount
            </button>
            <button
              className={styles.asyncButton}
              onClick={() =>
                dispatch(incrementAsync(Number(incrementAmount) || 0))
              }>
              Add Async
            </button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
