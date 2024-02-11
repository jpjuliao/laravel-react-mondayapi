import {IssueListProps} from '../types';

function IssueList({ issues, onUpdateIssue, onDeleteIssue }: IssueListProps): JSX.Element {
  console.log(issues);

  if (!Array.isArray(issues)) {
    // Handle the case where issues is not an array
    return <div>No issues found.</div>;
  }

  return (
    <div>
      <h2>Issues</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <span>{issue.name}</span>
            <button onClick={() => onUpdateIssue(issue.id, 'In Progress')}>Update</button>
            <button onClick={() => onDeleteIssue(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;
