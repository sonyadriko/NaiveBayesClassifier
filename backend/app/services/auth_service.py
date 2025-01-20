from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL

bcrypt = Bcrypt()
mysql = MySQL()

def validate_login(email, password):
    """Mengecek email dan password dari database"""
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    # Jika user tidak ditemukan
    if not user:
        return None, "User not found"

    # Jika password tidak cocok
    if not bcrypt.check_password_hash(user[2], password):  # user[2] adalah password
        return None, "Invalid password"

    # Jika login sukses, kembalikan user dan tidak ada error
    user_data = {
        'id': user[0],  # user[0] adalah id
        'nama': user[1],  # user[1] adalah nama
        'email': user[3],  # user[3] adalah email
        'role': user[4]  # user[4] adalah role
    }
    return user_data, None
