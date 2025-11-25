# Use Python 3.12
FROM python:3.12

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run uvicorn on 0.0.0.0 so Docker can access it
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
