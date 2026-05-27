# Azure ChatGPT Application
### Problem Statement
Organizations today struggle to provide **instant**, **accurate**, and **consistent** answers to user queries based on their internal knowledge such as documents, FAQs, policies, and business data.Traditional websites, search systems, and static knowledge bases fail to deliver **context-aware**, **conversational**, and **personalized responses**.<br>
### Solution Overview
This project aims to build an **Azure ChatGPT-based Single Page Application** that allows users to:

- Ask questions in natural language
- Receive business-specific, context-aware answers
- Generate images from text prompts for business use cases
  
The system eliminates complex navigation and replaces it with a **conversational**, **AI-driven interface**, improving productivity, decision-making, and user experience.
### Tech Stack
- Frontend: TypeScript, TailwindCSS, React
- Backend: Python, FastApi, RAG Architecture, GPT Models(gpt 4.1, text-embedding-ada-002)
- Cloud: Azure OpenAI, Azure AI Search, Microsoft Entra ID(for authentication & authorization), Azure Key Vault, Azure Web App
### Key Features
- ChatGPT-like experience tailored for a specific business
- Single-page, zero-navigation conversational UI
- Combined text intelligence and image generation
- Scalable, secure, and cloud-native architecture
- Faster access to accurate business information
### Application Architecture
<img width="1306" height="928" alt="custom search" src="https://github.com/user-attachments/assets/0c8f2e29-b0f1-4742-a162-dff806371002" /><br>
### Application Demo
<p float="left">
  <img src="https://github.com/user-attachments/assets/9c7c0956-b466-4887-86a5-65770ebe733b" width="49%" />
  <img src="https://github.com/user-attachments/assets/c00ab6b0-3dbd-432d-b436-88a43cc57363" width="49%" />
</p>

Application URL: (https://cldgptapp-g7a5cafjd7awezfd.canadacentral-01.azurewebsites.net/)
### Installation (in local machine)
1. Clone the repository to your local machine.
2. Deploy Azure AI Services,GPT models.
3. Configure endpoint,key values of various services in Azure Key Vault and apply key-vault values in `.env` file
4. Create a python environment for backend of the application.
5. Install the required dependencies from the `requirements.txt` file.
6. Run the backend api using the command: `uv run uvicorn main:app --reload`
7. Similarly, run the frontend app using the command: `npm run dev`




