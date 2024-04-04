import dotenv
from langchain.document_loaders.csv_loader import CSVLoader
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings


reviews_path="ModifiedEmails.csv"
chroma_path="chroma_data"

dotenv.load_dotenv()

loader = CSVLoader(file_path=reviews_path,source_column="Mail")
print(loader)
reviews = loader.load()

reviews_vector_db = Chroma.from_documents(
    reviews, OpenAIEmbeddings(), persist_directory=chroma_path
)


reviews_vector_db = Chroma(
    persist_directory=chroma_path,
     embedding_function=OpenAIEmbeddings(),
)

question = """does this email should set a meeting or not?  "Hi [Recipient],
I hope you're doing well. I have a quick question regarding the project timeline. Instead of scheduling a meeting, would it be possible to address this question via email or a brief call? Let me know your thoughts.
Thanks"
"""

relevant_docs = reviews_vector_db.similarity_search(question, k=1)

print(relevant_docs[0].page_content)



