import React from 'react';

let mermaidInitialized = false;

async function ensureMermaid() {
  if (!mermaidInitialized) {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '15px',
        primaryColor: '#f0f0f0',
        primaryTextColor: '#333',
        primaryBorderColor: '#333',
        lineColor: '#333',
        secondaryColor: '#e0e0e0',
        tertiaryColor: '#fafafa',
        background: '#ffffff',
        mainBkg: '#f0f0f0',
        secondBkg: '#e0e0e0',
        borderColor: '#333',
        clusterBkg: '#fafafa',
        clusterBorder: '#333',
      },
      flowchart: {
        curve: 'basis',
        padding: 20,
      },
    });
    mermaidInitialized = true;
    return mermaid;
  }
  return (await import('mermaid')).default;
}

function MermaidDiagram({ chart }) {
  const [svg, setSvg] = React.useState('');
  const [error, setError] = React.useState('');
  const id = React.useRef(`mermaid-${Math.random().toString(36).slice(2, 11)}`).current;

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = await ensureMermaid();
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(renderedSvg);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to render diagram');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="mermaid-error">
        <p>Diagram gagal dimuat: {error}</p>
        <pre>{chart}</pre>
      </div>
    );
  }

  return (
    <div
      className="mermaid-container"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default MermaidDiagram;
