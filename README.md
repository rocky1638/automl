# Actively Takehome Assignment – AutoML

## How to run

1. `cd` into the `client` directory and run `npm install` to install dependencies.
2. Run `npm start`.
3. `cd` into the `server` directory and install dependencies with `pip install -r requirements.txt`.
4. Run the backend server with `uvicorn index:app`.
5. Visit the app on `http://localhost:3000`.

## Possible next steps

- Features.
  - Support more types like `.xls` or `.txt`.
  - Give an option for users to select the format of their binary classification labels *(True/False, 1/0, etc.)*.
  - More validation on whether hypothetical input fields have valid values.
- Design.
  - Have a more streamlined UX flow through steps in a form instead of just scrolling down the page.
Dev.
  - Improve local development workflow with Docker/Kubernetes/Skaffold.

> Thanks for providing this take home assignment! It was quite fun to work on :)
