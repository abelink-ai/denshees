FROM python:3.11-slim

WORKDIR /app

COPY apps/agents/pyproject.toml .
RUN mkdir -p src && touch src/__init__.py && pip install --no-cache-dir .

COPY apps/agents/src ./src
RUN pip install --no-cache-dir --no-deps .

EXPOSE 8050

CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "8050"]
