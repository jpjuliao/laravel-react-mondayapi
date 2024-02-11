import { useState, useEffect } from 'react';
import { getIssues, createIssue, updateIssue, deleteIssue } from '../services/mondayService';
import IssueList from './IssueList';
import IssueForm from './IssueForm';
import { Issue } from '../types';

/**
 * Dashboard component.
 * @returns JSX.Element
 */
function Dashboard(): JSX.Element {
  // State for storing the list of issues
  const [issues, setIssues] = useState<Issue[]>([]);

  /**
   * Fetch issues from Monday.com when the component mounts.
   */
  useEffect(() => {
    getIssues()
      .then(
        (data: Issue[]) => setIssues(data)
      )
      .catch((error: Error) => console.error('Error fetching issues:', error));
  }, []);
    
  /**
   * Handler for creating a new issue.
   * @param {string} title - The title of the new issue.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  const handleCreateIssue = async (title: string): Promise<void> => {
    try {
      await createIssue(title);
      getIssues()
        .then((data: Issue[]) => setIssues(data))
        .catch((error: Error) => console.error('Error fetching issues:', error));
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  /**
   * Handler for updating an existing issue.
   * @param {number} issueId - The ID of the issue to update.
   * @param {string} status - The new status of the issue.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  const handleUpdateIssue = async (issueId: number, status: string): Promise<void> => {
    try {
      await updateIssue(issueId, status);
      getIssues()
        .then((data: Issue[]) => setIssues(data))
        .catch((error: Error) => console.error('Error fetching issues:', error));
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  /**
   * Handler for deleting an existing issue.
   * @param {number} issueId - The ID of the issue to delete.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  const handleDeleteIssue = async (issueId: number): Promise<void> => {
    try {
      await deleteIssue(issueId);
      getIssues()
        .then((data: Issue[]) => setIssues(data))
        .catch((error: Error) => console.error('Error fetching issues:', error));
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  return (
    <div>
      <IssueForm onCreateIssue={handleCreateIssue} />
      <IssueList 
        issues={issues} 
        onUpdateIssue={handleUpdateIssue} 
        onDeleteIssue={handleDeleteIssue} 
      />
    </div>
  );
}

export default Dashboard;
