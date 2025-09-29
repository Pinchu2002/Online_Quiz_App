import { useEffect, useRef, useState } from 'react';
import { Question, SubmitResponse } from './type';

const API = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000/api';

function StartScreen({ onStart }: { onStart: () => void}) {
  return <div style={{textAlign:'center'}}><h1>Quiz</h1><button onClick={onStart}>Start</button></div>;
}

function QuestionView({ q, answer, setAnswer }: { q: Question; answer: number | null | undefined; setAnswer: (optId: number) => void }) {
  return (
    <div>
      <p>{q.text}</p>
      <div>
        {q.options.map(o => (
          <label key={o.id} style={{display:'block', margin:'6px 0'}}>
            <input type="radio" name={`q_${q.id}`} checked={answer === o.id} onChange={() => setAnswer(o.id)} />
            {o.text}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<'start'|'quiz'|'results'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number|null>>({});
  const [results, setResults] = useState<SubmitResponse | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const timerRef = useRef<number | null>(null);

  async function fetchQuestions() {
    const r = await fetch(`${API}/questions`);
    const data = await r.json();
    setQuestions(data);
  }

  const start = async () => {
    await fetchQuestions();
    setCurrent(0);
    setScreen('quiz');
  };

  useEffect(() => {
    if (screen === 'quiz') {
      setTimeLeft(60);
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            if (timerRef.current) window.clearInterval(timerRef.current);
            doSubmit();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  function setAnswer(qid: number, optId: number) {
    setAnswers(prev => ({ ...prev, [qid]: optId }));
  }

  async function doSubmit() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    const payload = { answers: {} as Record<number, number | null> };
    for (const q of questions) payload.answers[q.id] = answers[q.id] ?? null;
    const r = await fetch(`${API}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data: SubmitResponse = await r.json();
    setResults(data);
    setScreen('results');
  }

  if (screen === 'start') return <StartScreen onStart={start} />;
  if (screen === 'quiz') {
    if (!questions.length) return <div>Loading...</div>;
    const q = questions[current];
    return (
      <div style={{maxWidth:800, margin:'auto'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}><div>Time left: {timeLeft}s</div><div>Q {current+1}/{questions.length}</div></div>
        <QuestionView q={q} answer={answers[q.id] ?? null} setAnswer={(opt) => setAnswer(q.id, opt)} />
        <div style={{marginTop:12}}>
          <button onClick={() => setCurrent(c => Math.max(0, c-1))} disabled={current === 0}>Previous</button>
          {current < questions.length - 1 ? (
            <button onClick={() => setCurrent(c => c+1)}>Next</button>
          ) : (
            <button onClick={doSubmit}>Submit</button>
          )}
        </div>
      </div>
    );
  }
  if (screen === 'results' && results) {
    return (
      <div style={{maxWidth:800, margin:'auto'}}>
        <h2>Results</h2>
        <p>Score: {results.correct} / {results.total_questions} ({results.score_percent}%)</p>
        <ol>
          {questions.map(q => (
            <li key={q.id}><strong>{q.text}</strong> — {results.details[q.id] ? 'Correct' : 'Wrong'}</li>
          ))}
        </ol>
        <button onClick={() => { setScreen('start'); setResults(null); setAnswers({}); setCurrent(0); }}>Restart</button>
      </div>
    );
  }
  return null;
}
