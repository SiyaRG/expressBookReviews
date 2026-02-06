# Book Review Application - cURL Commands Reference

## Server Setup
```bash
cd expressBookReviews/final_project
npm install
npm start
```

## Task 1: Get All Books
**PowerShell Command:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/" -Method GET
```

**cURL Command (for Unix/Linux):**
```bash
curl -X GET http://localhost:5000/
```

## Task 2: Get Book by ISBN
**PowerShell Command:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/isbn/1" -Method GET
```

**cURL Command (for Unix/Linux):**
```bash
curl -X GET http://localhost:5000/isbn/1
```

## Task 3: Get Books by Author
**PowerShell Command:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/author/Chinua%20Achebe" -Method GET
```

**cURL Command (for Unix/Linux):**
```bash
curl -X GET http://localhost:5000/author/Chinua%20Achebe
```

## Task 4: Get Books by Title
**PowerShell Command:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/title/Things%20Fall%20Apart" -Method GET
```

**cURL Command (for Unix/Linux):**
```bash
curl -X GET http://localhost:5000/title/Things%20Fall%20Apart
```

## Task 5: Get Book Reviews
**PowerShell Command:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/review/1" -Method GET
```

**cURL Command (for Unix/Linux):**
```bash
curl -X GET http://localhost:5000/review/1
```

## Task 6: User Registration
**PowerShell Command:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/register" -Method POST -ContentType "application/json" -Body '{"username":"testuser","password":"testpass"}'
```

**cURL Command (for Unix/Linux):**
```bash
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}'
```

## Authentication Testing (Optional)
**Login:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/customer/login" -Method POST -ContentType "application/json" -Body '{"username":"testuser","password":"testpass"}'
```

**Add Review (requires authentication):**
```powershell
# First login to get session, then:
Invoke-WebRequest -Uri "http://localhost:5000/customer/auth/review/1?review=Great%20book!" -Method PUT
```

## Expected Outputs

### Task 1 - All Books
Returns JSON object with all books formatted with indentation.

### Task 2 - Book by ISBN
```json
{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}
```

### Task 3 - Books by Author
```json
[{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}]
```

### Task 4 - Books by Title
```json
[{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}]
```

### Task 5 - Book Reviews
```json
{}
```

### Task 6 - User Registration
```json
{"message":"User successfully registered. Now you can login"}
```

## Notes
- Server runs on port 5000
- All endpoints return appropriate HTTP status codes
- Authentication uses JWT tokens stored in session
- Books database contains 10 preloaded books with ISBN numbers 1-10
