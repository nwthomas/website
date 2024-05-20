import os

BRANCH_NAME = os.getenv("BRANCH_NAME", "")
EMBEDDING_MODEL="text-embedding-3-large"
GITHUB_API_KEY = os.getenv("GITHUB_TOKEN", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")
PULL_REQUEST_NUMBER = int(os.getenv('PR_NUMBER', "0"))
PULL_REQUEST_TEMPLATE_PATH = ".github/PULL_REQUEST_TEMPLATE.md"
REPO_PATH = os.getenv('REPO_PATH', "")
