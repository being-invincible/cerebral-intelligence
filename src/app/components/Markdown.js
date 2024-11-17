import { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

function useProcessor(markdown = '') {
  const [processedContent, setProcessedContent] = useState('');

  useEffect(() => {
    if (!markdown?.trim()) {
      setProcessedContent('');
      return;
    }

    unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(markdown)
      .then((file) => {
        setProcessedContent(String(file));
      })
      .catch((error) => {
        console.error('Markdown processing error:', error);
        setProcessedContent('');
      });
  }, [markdown]);

  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
}

export default useProcessor;