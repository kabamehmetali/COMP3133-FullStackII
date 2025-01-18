
# CSV Data Processor

This is a Node.js project to process a CSV file, filter data for Canada and the United States, and save the filtered data into separate text files.

## Features
- Reads data from an input CSV file.
- Filters data by country (Canada and United States).
- Saves the filtered data into `canada.txt` and `usa.txt`.
- Displays the content of the output files in the console.
- Handles file operations with proper error handling.

## Prerequisites
Make sure you have Node.js installed on your system. To install the required modules, run:

```bash
npm install
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project folder:
   ```bash
   cd <repository_folder>
   ```

3. Install dependencies:
   ```bash
   npm install csv-parser
   ```

## Usage

1. Place your `input_countries.csv` file in the project folder.
2. Start the program by running:
   ```bash
   node index.js
   ```

## File Structure
- `index.js`: Main script that processes the CSV file.
- `canada.txt`: Contains filtered data for Canada.
- `usa.txt`: Contains filtered data for the United States.

## Error Handling
- Deletes `canada.txt` and `usa.txt` if they exist before processing the CSV file.
- Logs errors during file operations and CSV processing.

## Example
Given the `input_countries.csv` file:

| country         | city       | population |
|-----------------|------------|------------|
| Canada          | Toronto    | 2,731,571  |
| United States   | New York   | 8,336,817  |
| Canada          | Vancouver  | 631,486    |
| United States   | Los Angeles| 3,979,576  |

Output:
- `canada.txt`:
  ```json
  [
    {
      "country": "Canada",
      "city": "Toronto",
      "population": "2,731,571"
    },
    {
      "country": "Canada",
      "city": "Vancouver",
      "population": "631,486"
    }
  ]
  ```

- `usa.txt`:
  ```json
  [
    {
      "country": "United States",
      "city": "New York",
      "population": "8,336,817"
    },
    {
      "country": "United States",
      "city": "Los Angeles",
      "population": "3,979,576"
    }
  ]
  ```

## Author
Mehmet Ali Kaba
