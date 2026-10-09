import { useEffect, useState } from 'react';
import { selectExampleLines, type ContextView } from '../data/context-example';
import type { translations } from '../i18n/translations';

type Props = { text: (typeof translations)['es']['journey']['demo'] };

export default function ContextComparison({ text }: Props) {
  const [view, setView] = useState<ContextView>('full');
  const [ready, setReady] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <div className="comparison" data-keyboard={keyboard}>
      <div className="comparison-header">
        <span className="example-label">{text.label}</span>
        <h4 id="comparison-title">{text.title}</h4>
        <p>{text.query}</p>
      </div>
      <div className="comparison-controls" role="group" aria-label={text.controls} hidden={!ready}>
        {(['full', 'focused'] as const).map((mode) => (
          <button key={mode} type="button" aria-pressed={view === mode} aria-controls="example-code"
            onKeyDown={() => setKeyboard(true)} onPointerDown={() => setKeyboard(false)}
            onClick={(event) => { setKeyboard(event.detail === 0); setView(mode); }}>
            <span aria-hidden="true">{view === mode ? '●' : '○'}</span> {text[mode]}
          </button>
        ))}
      </div>
      <div className="code-heading"><span>invoice.js</span><span>{view === 'full' ? text.full : text.focused}</span></div>
      <pre id="example-code" tabIndex={0} aria-labelledby="comparison-title"><code>
        {selectExampleLines(view).map((line) => (
          <span key={line.number} className={`code-line${line.relevant ? ' relevant-line' : ''}`}>
            <span className="line-number" aria-hidden="true">{line.number}</span><span>{line.code || ' '}</span>{'\n'}
          </span>
        ))}
      </code></pre>
      <p className="comparison-status" role="status" aria-live="polite">{view === 'full' ? text.fullDescription : text.focusedDescription}</p>
      <p className="comparison-note">{text.disclaimer}</p>
    </div>
  );
}
