# Serverless Notes Backend

This Serverless Framework project, named `sls-notes-backend`, provides a simple backend for managing notes. It uses AWS Lambda, DynamoDB, and API Gateway to handle CRUD operations on notes.

## Features

- **Add Note**: Allows you to add a new note via a POST request to `/note`.
- **Update Note**: Supports updating a note with a PATCH request to `/note`.
- **Get Notes**: Retrieves all notes with a GET request to `/notes`.
- **Get Note**: Fetches a specific note using a GET request to `/note/n/{note_id}`.
- **Delete Note**: Deletes a note by timestamp with a DELETE request to `/note/t/{timestamp}`.

## Configuration

### Serverless Plugins

- [serverless-offline](https://www.npmjs.com/package/serverless-offline): Enables running the serverless application locally.
- [serverless-domain-manager](https://www.npmjs.com/package/serverless-domain-manager): Simplifies setting up a custom domain for API Gateway.

### Custom Configuration

- **Allowed Headers**: Specifies the headers allowed in CORS configurations.

### AWS Configuration

- **Region**: `ap-southeast-2`
- **Stage**: `prod`
- **Runtime**: Node.js 14.x
- **Memory Size**: 128 MB
- **Timeout**: 5 seconds
- **Environment Variables**:
  - `NOTES_TABLE`: DynamoDB table name for storing notes.

### AWS IAM Role Statements

Allows necessary actions on the DynamoDB table:

- `dynamodb:Query`
- `dynamodb:PutItem`
- `dynamodb:DeleteItem`

### Functions

1. **add-note**: Handles adding a new note.
2. **update-note**: Handles updating a note.
3. **get-notes**: Retrieves all notes.
4. **get-note**: Fetches a specific note by ID.
5. **delete-note**: Deletes a note by timestamp.

### DynamoDB Table

- **Table Name**: `${self:provider.environment.NOTES_TABLE}`
- **Primary Key**:
  - `user_id` (HASH)
  - `timestamp` (RANGE)
- **Secondary Index**:
  - `note_id-index`: Index on the `note_id` attribute.

## Deployment

1. Ensure AWS credentials are configured on your machine.
2. Install dependencies: `npm install` or `yarn install`.
3. Deploy to AWS: `serverless deploy`.

## Testing

After deployment, check the Serverless Framework output for the API Gateway endpoints. Use these URLs to test your functions.

```bash
serverless info
```

Feel free to explore the Serverless Framework documentation for additional configurations or advanced features: [Serverless Framework Documentation](https://www.serverless.com/learn/quick-start/).



code needed
1) sls deploy
2) sls offline  
3) npm install -save serverless-offline                                   
4) sls create -t aws-nodejs -p sls-notes-backend     
5) serverless plugin install -n serverless-offline 
6) npm install --save aws-sdk moment underscore uuid 
7) npm init -y    


Step:
1) create pipeline( Git => code build(choose aws lamda))
2) sls deploy (cloud formation)
