import React, { useState, useRef } from 'react';
import { Edit2, Save, PlusCircle, X, Upload } from 'lucide-react';

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({});
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSend = async () => {
   const trimmedInput = input.trim();

   if (trimmedInput) {
     const newMessage = {
       type: 'user',
       content: trimmedInput,
       files: [] // 移除文件部分
     };

     setMessages([...messages, newMessage]);

     try {
       const formData = new FormData();
       formData.append('message', trimmedInput);

       const response = await fetch('http://127.0.0.1:8301/chat', {
         method: 'POST',
         body: formData,
       });

       if (!response.ok) {
         throw new Error('Network response was not ok');
       }

       const data = await response.json();
       setMessages(prev => [...prev, {
         type: 'ai',
         content: data.content,
         table: data.table
       }]);
     } catch (error) {
       console.error('Error sending message:', error);
     }
   }
 };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleEdit = (messageIndex, rowIndex, field, value) => {
    setPendingChanges({
      ...pendingChanges,
      [`${messageIndex}-${rowIndex}-${field}`]: value
    });
  };

  const handleSave = (messageIndex) => {
    const newMessages = [...messages];
    newMessages[messageIndex].table = newMessages[messageIndex].table.map((row, rowIndex) => ({
      key: pendingChanges[`${messageIndex}-${rowIndex}-key`] || row.key,
      value: pendingChanges[`${messageIndex}-${rowIndex}-value`] || row.value
    }));
    setMessages(newMessages);
    setPendingChanges({});
    setEditingCell(null);
  };

  const handleAddRow = (messageIndex) => {
    const newMessages = [...messages];
    newMessages[messageIndex].table.push({ key: '', value: '' });
    setMessages(newMessages);
    setEditingCell(`${messageIndex}-${newMessages[messageIndex].table.length - 1}-key`);
  };

  const handleDeleteRow = (messageIndex, rowIndex) => {
    const newMessages = [...messages];
    newMessages[messageIndex].table.splice(rowIndex, 1);
    setMessages(newMessages);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">AI 工单助手</h1>
      </header>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
              <p>{message.content}</p>
              {message.files && message.files.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">Attached Files:</p>
                  <ul className="list-disc list-inside">
                    {message.files.map((file, fileIndex) => (
                      <li key={fileIndex}>{file}</li>
                    ))}
                  </ul>
                </div>
              )}
              {message.table && (
                <div className="mt-2">
                  <table className="w-full border-collapse">
                    <tbody>
                      {message.table.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                          {['key', 'value'].map((field) => (
                            <td key={field} className="py-2 px-4">
                              {editingCell === `${index}-${rowIndex}-${field}` ? (
                                <input
                                  value={pendingChanges[`${index}-${rowIndex}-${field}`] || row[field]}
                                  onChange={(e) => handleEdit(index, rowIndex, field, e.target.value)}
                                  className="w-full p-1 border rounded"
                                  autoFocus
                                />
                              ) : (
                                <div className="flex justify-between items-center">
                                  <span>{pendingChanges[`${index}-${rowIndex}-${field}`] || row[field]}</span>
                                  <button onClick={() => setEditingCell(`${index}-${rowIndex}-${field}`)}>
                                    <Edit2 size={16} />
                                  </button>
                                </div>
                              )}
                            </td>
                          ))}
                          <td className="py-2 px-4">
                            <button onClick={() => handleDeleteRow(index, rowIndex)} className="text-red-500">
                              <X size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-2 flex justify-between">
                    <button
                      onClick={() => handleAddRow(index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      添加行
                    </button>
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      保存
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入消息..."
              className="flex-1 p-2 border rounded"
            />
            <button onClick={() => fileInputRef.current.click()} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              <Upload size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              className="hidden"
            />
            <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              发送
            </button>
          </div>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center">
                  <span className="mr-2">{file.name}</span>
                  <button onClick={() => handleRemoveFile(index)} className="text-red-500">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
