import React, { useState } from 'react';
import { IssueFormProps } from '../types';

function IssueForm({ onCreateIssue }: IssueFormProps): JSX.Element {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onCreateIssue(title); // Pass only the title to onCreateIssue
    setTitle(''); // Reset title after submission
  };

  return (
    <div>
      <h2>Create Issue</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default IssueForm;
