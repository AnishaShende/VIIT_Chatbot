1. Backend Setup (FastAPI + MongoDB + HuggingFace)
Step 1: Install Dependencies
First, ensure that you have Python installed on your machine. You can download it from python.org.

Then, 
```bash
# Navigate to the 'api' folder
cd api

# Install required packages
pip install -r requirements.txt
```
run the backend:
uvicorn main:app --host 0.0.0.0 --port 8000

Step 2:frontend
```bash
cd..  (go out of api folder)
# Install the necessary dependencies
npm install

```
Step 3: Update API URL
In the Chatbot.jsx component, update the API URL to point to your locally running FastAPI backend:
javascript
Copy code
```
const response = await fetch("http://127.0.0.1:8000/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input_text: inputText })
});
```

step4:
npm run dev

![image](https://github.com/user-attachments/assets/4b176849-3da4-4a38-8491-0761d5540afd)



