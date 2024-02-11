import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Fetches the list of issues from the backend API.
 * @returns {Promise<any>} A promise that resolves to the list of issues.
 * @throws {Error} If an error occurs while fetching the issues.
 */
export const getIssues = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE_URL}/board`);
    return response.data;
  } catch (error:any) {
    throw new Error(`Failed to fetch board: ${error.message}`);
  }
};

/**
 * Creates a new issue.
 * @param {string} itemName - The name of the new issue.
 * @returns {Promise<any>} A promise that resolves to the created issue.
 * @throws {Error} If an error occurs while creating the issue.
 */
export const createIssue = async (itemName: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${API_BASE_URL}/create-issue`, { title: itemName });
    return response.data.issue;
  } catch (error:any) {
    throw new Error(`Failed to create issue: ${error.message}`);
  }
};

/**
 * Updates an existing issue.
 * @param {number} id - The ID of the issue to update.
 * @param {string} status - The new status of the issue.
 * @returns {Promise<any>} A promise that resolves to the updated issue.
 * @throws {Error} If an error occurs while updating the issue.
 */
export const updateIssue = async (id: number, status: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.patch(`${API_BASE_URL}/update-issue/${id}`, { status });
    return response.data.data.boards;
  } catch (error:any) {
    throw new Error(`Failed to update issue: ${error.message}`);
  }
};

/**
 * Deletes an existing issue.
 * @param {number} id - The ID of the issue to delete.
 * @returns {Promise<any>} A promise that resolves after the issue is deleted.
 * @throws {Error} If an error occurs while deleting the issue.
 */
export const deleteIssue = async (id: number): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.delete(`${API_BASE_URL}/delete-issue/${id}`);
    return response.data.data.boards;
  } catch (error:any) {
    throw new Error(`Failed to delete issue: ${error.message}`);
  }
};
