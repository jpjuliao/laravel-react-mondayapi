export interface Issue {
  id: number;
  name: string;
  status: string;
}

export interface IssueFormProps {
  onCreateIssue: (title: string) => void;
}

export interface IssueListProps {
  issues: Issue[];
  onUpdateIssue: (issueId: number, status: string) => void;
  onDeleteIssue: (issueId: number) => void;
}