import uvicorn
from fastapi import FastAPI, Request
from transformers import AutoTokenizer, AutoModelForCausalLM
from fastapi.middleware.cors import CORSMiddleware
import torch

# Initialize FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, can be restricted to specific domains
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load the model and tokenizer
model_name = "AnishaShende/tinyllama-unsloth-merged_1"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Route for generating chatbot responses
@app.post("/chat")
async def get_response(request: Request):
    data = await request.json()
    user_input = data.get("input_text")
    
    if not user_input:
        return {"error": "No input_text provided"}

    input_question = f"<s>[INST] {user_input} [/INST]"
    input_ids = tokenizer(input_question, return_tensors="pt").input_ids

    with torch.no_grad():
        output_ids = model.generate(input_ids, max_length=50, num_return_sequences=1)

    generated_answer = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    # Clean the answer by removing [INST] and other special tokens
    cleaned_answer = generated_answer.replace('[INST]', '').replace('[/INST]', '').strip()

    print(f"User Input: {user_input}, Bot Response: {cleaned_answer}")  # Debugging log

    return {"input": user_input, "response": cleaned_answer}

# Root route for testing if the server is running
@app.get("/")
async def root():
    return {"message": "Chatbot is running!"}
#somsv

# Main function to run the app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
