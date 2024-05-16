from github import Github
import os


def update_embedded_blog_content() -> None:
    """
    Gets all blog content at <repo-root>/client/content/blogs/**.mdx, chunks the text, and stores
    it in a vector database in order to be able to live-chat against Nathan's blog posts.
    """
    repo_path = os.getenv("REPO_PATH")
    github_token = os.getenv("GITHUB_TOKEN")
    pinecone_api_key = os.getenv("PINECONE_API_KEY")
    openai_api_key = os.getenv("OPENAI_API_KEY")

    gh = Github(github_token)


if __name__ == "__main__":
    main()
