<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MondayController extends Controller
{
    /**
     * The API key for accessing Monday.com API.
     *
     * @var string
     */
    protected $apiKey;

    /**
     * The base URL for Monday.com API.
     *
     * @var string
     */
    protected $apiBaseUrl;

    /**
     * The ID of the board in Monday.com.
     *
     * @var int
     */
    protected $boardId;

    /**
     * Create a new MondayController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->apiKey = env('MONDAY_API_KEY');
        $this->apiBaseUrl = env('MONDAY_API_BASE_URL');
        $this->boardId = env('MONDAY_BOARD_ID');
    }

    /**
     * Fetch issues from Monday.com.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchIssues()
    {

        try {

            $query = '{ boards (ids:"'.$this->boardId.'") {
                    name
                    items_page (limit: 25) {
                        items	{ id name }
                    }
                } }';

            $response = Http::withHeaders([
                'Authorization' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->apiBaseUrl, [
                'query' => $query,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['data']['boards'][0]['items_page']['items'];
            } else {
                return response()->json(['error' => 'Failed to fetch issues from Monday.com'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Create a new issue within a board.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createIssue(Request $request)
    {
        try {

            $title = $request->input('title');

            $query = 'mutation {
                create_item (board_id: "' . $this->boardId . '", item_name: "' . $title . '") {
                    id
                }
            }';

            $response = Http::withHeaders([
                'Authorization' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->apiBaseUrl, [
                'query' => $query,
            ]);

            if ($response->successful()) {
                $createdIssue = $response->json()['data']['create_item'];

                return response()->json([
                    'message' => 'Issue created successfully',
                    'issue' => $createdIssue
                ]);
            } else {
                return response()->json(
                    ['error' => 'Failed to create issue'],
                    $response->status()
                );
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update a field on an existing item.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateField(Request $request, $id)
    {

        $status = $request->input('status');

        try {
            $response = Http::withHeaders([
                'Authorization' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->patch("$this->apiBaseUrl/items/$id", [
                'updates' => [
                    [
                        'columnName' => 'status',
                        'value' => $status,
                    ]
                ]
            ]);

            if ($response->successful()) {
                return response()->json(['message' => 'Field updated successfully']);
            } else {
                return response()->json(['error' => 'Failed to update field'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete an item.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteItem($id)
    {

        try {
            $response = Http::withHeaders([
                'Authorization' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->delete("$this->apiBaseUrl/items/$id");

            if ($response->successful()) {
                return response()->json(['message' => 'Item deleted successfully']);
            } else {
                return response()->json(['error' => 'Failed to delete item'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
