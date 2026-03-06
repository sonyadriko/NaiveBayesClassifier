# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Naive Bayes Classifier application for predicting vocational school (SMK) students' job placement outcomes. The system predicts whether students will get a job based on features like extracurricular activities, gender, final grades, organizational experience, professional certification, and internship history.

## Architecture

**Backend (Flask, `/backend`):**
- Entry point: `app.py` or `wsgi.py` (for production)
- Application factory pattern: `app/__init__.py` → `create_app()`
- API namespaces registered via Flask-RestX:
  - `/upload` - Upload Excel training data
  - `/predict` - Make predictions using trained model
  - `/get_labels` - Get feature labels
  - `/evaluate` - Model evaluation
  - `/auth` - JWT authentication (login, register)
  - `/users` - User CRUD operations
- Services layer (`app/services/`): `naive_bayes_service.py`, `data_transformer.py`, `file_processor.py`, `auth_service.py`
- Custom Naive Bayes classifier: `app/models/naive_bayes_classifier.py`
- JWT authentication with MySQL database (`naive_bayes`)

**Frontend (React + TypeScript, `/frontend`):**
- Vite + React 18 + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- JWT-based auth (token stored in localStorage)
- Pages: `HomePage`, `PredictionPage`, `DataTrainingPage`, `EvaluationPage`, `LoginPage`, `AccountManagementPage`
- Public route: `/prediction` (no auth required)
- Protected routes: `/`, `/data-training`, `/evaluation` (require JWT token)

**Legacy Frontend (PHP, `/fe-php`):**
- Alternative PHP-based frontend (deprecated/legacy)

## Data Flow

1. **Training**: User uploads Excel file → `/upload` endpoint → data saved as `data.xlsx`
2. **Prediction**: Frontend sends feature data → `/predict` endpoint → model loads `data.xlsx`, trains, returns prediction with priors/likelihoods/posteriors
3. **Target column**: `Durasi Mendapat Kerja` (Duration to Get Job)

## Development Commands

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
flask run  # or python app.py
# Production: gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev    # Development server (Vite)
npm run build  # Production build
npm run lint   # ESLint
```

## Key Files

- `backend/app/__init__.py` - Flask app initialization, database config, JWT secret
- `backend/app/models/naive_bayes_classifier.py` - Core Naive Bayes algorithm
- `backend/app/api/predict.py` - Prediction endpoint (loads data.xlsx, trains, predicts)
- `backend/app/api/upload.py` - File upload processing
- `frontend/src/App.tsx` - Router configuration, auth guards
- `backend/data.xlsx` - Training data (generated from uploads)

## Notes

- The model retrains on every prediction request (loads `data.xlsx` fresh each time)
- Excel file must have 8 columns matching expected headers in `upload.py`
- MySQL connection configured in `app/__init__.py` (localhost, root, no password, `naive_bayes` db)
- JWT secret is hardcoded in `app/__init__.py` (should be moved to env variable for production)
