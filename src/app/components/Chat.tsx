'use client';

import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePaste = useCallback((event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    const imageFiles = Array.from(items)
      .filter(item => item.type.startsWith('image/'))
      .map(item => item.getAsFile())
      .filter((file): file is File => file !== null);

    if (imageFiles.length > 0) {
      const fileList = new DataTransfer();
      imageFiles.forEach(file => fileList.items.add(file));
      setFiles(fileList.files);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='p-[4px] bg-gradient-apple from-blue via-purple to-pink to-90% rounded-lg flex w-[85%]'>
    <div 
      ref={chatContainerRef}
      className={`container flex flex-col w-9/10 h-[650px] gap-2 bg-white dark:bg-eireblack p-5 rounded-lg overflow-scroll scroll-smooth`}
    >
      {/* <div className='p-[4px] bg-gradient-apple from-orange via-pink to-purple to-90%'></div> */}
      
      {messages.map(m => (
        <div className='mb-20' key={m.id}>
          {m.role === 'user' ? (
            <div className='flex justify-end'>
              <div className="dark:text-white bg-white dark:bg-azure w-fit max-w-[75%] rounded-md rounded-tr-none p-4 text-lg items-center
              grid grid-flow-col gap-5">
                
                {m.content}
                <div className="flex w-10 h-10 overflow-hidden rounded-full border-1 border-white self-start">
                    <img src="https://t4.ftcdn.net/jpg/08/08/15/21/360_F_808152129_tGUbu4cQiYdWci2hLhIm2gJSujMZ8Bn4.jpg"
                    alt="User Logo" 
                    className='object-center object-cover scale-[200%]'
                    />
                </div>
              </div>
            </div>
          ) : (
            <div className='grid justify-start'>
              <div className=" bg-white dark:bg-onyx w-fit rounded-md rounded-tl-none p-4 text-lg items-center
              grid grid-flow-col gap-5">
                <div className="flex w-10 h-10 overflow-hidden rounded-full border-1 border-white self-start">
                    <img src="https://pbs.twimg.com/media/GTvNPiYXUAAXBe4.jpg:large"
                    alt="Apple Intelligence Logo" 
                    className='object-center scale-[250%]'
                    />
                </div>
                <ReactMarkdown className="prose prose-stone break-words dark:prose-invert">{m.content}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className='absolute inset-x-0 bottom-[57px] left-1/2 transform -translate-x-1/2 w-full px-[114px]'>
      <form onSubmit={event => {
          handleSubmit(event, {
            experimental_attachments: files,
          });

          setFiles(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
       className='flex justify-center gap-2 bg-white dark:bg-eireblack p-5 rounded-b-lg'>
        <input
          value={input}
          className="text-night dark:bg-gray-500 dark:text-blue-100 flex-grow w-full p-2 border border-blue-300 rounded shadow-md placeholder:text-blue-100
          border-gradient-apple from-blue via-purple to-pink"
          placeholder="Ask me something..."
          onChange={handleInputChange}
        />
        <button type='submit' className='px-5 py-3 text-white rounded-md bg-gradient-apple from-blue via-purple to-pink'>Send</button>
      </form>
      </div>
      </div>
    </div>
  );
}