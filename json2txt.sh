#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <input_json_file> <output_txt_file>"
    exit 1
fi

# Assign the input and output file paths
INPUT_JSON_FILE="$1"
OUTPUT_TXT_FILE="$2"

# Read the JSON file, remove all breaklines and spaces, and print to stdout
cat "$INPUT_JSON_FILE" | tr -d '\n' | tr -d '[:space:]' > "$OUTPUT_TXT_FILE"

echo "Contents of $INPUT_JSON_FILE have been processed and saved to $OUTPUT_TXT_FILE."
