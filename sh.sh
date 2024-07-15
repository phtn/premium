
curl -X POST \

  -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
  -H "Content-Type: application/json; charset=utf-8" \
  -d @en66.json \
  -o ocr-res-2.json \
  "https://us-documentai.googleapis.com/v1/projects/20013354165/locations/us/processors/bac05e2a9d46a902:process"



  {
    "skipHumanReview": true,
    "rawDocument": {
      "mimeType": "application/jpeg",
      "content": "...DOCUMENT_BASE64_CONTENT..."
    }
  }
