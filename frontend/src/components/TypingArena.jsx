import { useEffect, useMemo, useRef, useState } from 'react';

const calcStats = ({ correctChars, typedChars, elapsedSec }) => {
  const minutes = Math.max(elapsedSec / 60, 1 / 60);
  const wpm = Math.round(correctChars / 5 / minutes);
  const cpm = Math.round(correctChars / minutes);
  const accuracy = typedChars ? Math.max(0, Math.round((correctChars / typedChars) * 100)) : 100;
  return { wpm, cpm, accuracy };
};

const TypingArena = ({ text, duration, onComplete, onProgress }) => {
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!started || ended) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, ended]);

  const analysis = useMemo(() => {
    let errors = 0;
    let correctChars = 0;
    for (let i = 0; i < input.length; i += 1) {
      if (input[i] === text[i]) correctChars += 1;
      else errors += 1;
    }
    return { errors, correctChars, typedChars: input.length };
  }, [input, text]);

  const elapsed = duration - timeLeft;
  const stats = calcStats({ ...analysis, elapsedSec: elapsed || 1 });

  useEffect(() => {
    onProgress?.({ ...stats, errors: analysis.errors, timeLeft, progress: (input.length / text.length) * 100 });
  }, [stats.wpm, stats.cpm, stats.accuracy, analysis.errors, timeLeft, input.length, text.length]);

  useEffect(() => {
    if (!ended) return;
    onComplete?.({ ...stats, errors: analysis.errors, rawInput: input });
  }, [ended]);

  const handleChange = (e) => {
    if (!started) setStarted(true);
    if (ended) return;
    const value = e.target.value;
    if (value.length <= text.length) setInput(value);
    if (value.length === text.length) setEnded(true);
  };

  return (
    <div className="arena card">
      <div className="timer">⏱ {timeLeft}s</div>
      <div className="prompt" onClick={() => inputRef.current?.focus()}>
        {text.split('').map((char, idx) => {
          let cls = '';
          if (idx < input.length) cls = input[idx] === char ? 'correct' : 'incorrect';
          if (idx === input.length && !ended) cls = `${cls} current`;
          return (
            <span key={`${char}-${idx}`} className={cls}>
              {char}
            </span>
          );
        })}
      </div>
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        className="typing-input"
      />
    </div>
  );
};

export default TypingArena;
