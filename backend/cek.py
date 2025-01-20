from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
password = 'surabaya123'  # Password yang dimasukkan oleh user
stored_hash = '$2b$12$QCUvKSQgX30RmatVYHNXbe8tIf1C3wt1nr.8DCoHaAOwa3/D92NxK'  # Hash yang diambil dari DB

if bcrypt.check_password_hash(stored_hash, password):
    print("Password match!")
else:
    print("Invalid password!")
