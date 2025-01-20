from flask_restx import Namespace, Resource, fields
from flask import request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import bcrypt, mysql  # Mengimpor ekstensi dari extensions.py

auth_ns = Namespace('auth', description='Autentikasi dan Login')

# Model request untuk login
login_model = auth_ns.model('Login', {
    'email': fields.String(required=True, description='Email pengguna untuk login'),
    'password': fields.String(required=True, description='Password pengguna untuk login')
})

# Model request untuk registrasi
register_model = auth_ns.model('Register', {
    'name': fields.String(required=True, description='Nama pengguna'),
    'email': fields.String(required=True, description='Email pengguna untuk registrasi'),
    'password': fields.String(required=True, description='Password pengguna untuk registrasi'),
    'role': fields.String(required=True, description='Role pengguna')
})

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.doc('login')
    @auth_ns.response(200, 'Login sukses')
    @auth_ns.response(400, 'Invalid email or password')
    @auth_ns.expect(login_model)  # Menghubungkan model request
    def post(self):
        """Login menggunakan email dan password"""
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return {"error": "Email and password are required"}, 400

        # Validasi login
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user and bcrypt.check_password_hash(user[3], password):  # user[2] adalah password
            access_token = create_access_token(identity=user[0])  # user[0] adalah ID
            return {
                'access_token': access_token,
                'role': user[4]  # Role ada di index 3
            }, 200
        else:
            return {"error": "Invalid email or password"}, 400


@auth_ns.route('/register')
class Register(Resource):
    @auth_ns.doc('register')
    @auth_ns.response(200, 'Registrasi sukses')
    @auth_ns.response(400, 'Invalid email or password')
    @auth_ns.expect(register_model)
    def post(self):
        try:
            # Ambil data dari request
            data = request.get_json()

            # Ambil nilai email, password, dan role
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            role = data.get('role')

            # Cek apakah ada parameter yang kosong
            if not name or not email or not password or not role:
                return {"error": "Missing required fields"}, 400

            # Verifikasi apakah email sudah terdaftar
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            existing_user = cursor.fetchone()

            if existing_user:
                return {"message": "User already exists"}, 400

            # Enkripsi password menggunakan bcrypt
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

            # Insert user baru ke database
            cursor.execute("INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
                           (name, email, hashed_password, role))
            mysql.connection.commit()

            # Kembalikan respons dalam bentuk dictionary
            return {"message": "User created successfully"}, 201

        except Exception as e:
            # Tangani error dan kirimkan pesan error dalam bentuk dictionary
            return {"error": str(e)}, 500

# @auth_ns.route('/logout')
# class Logout(Resource):
#     @auth_ns.doc('logout')
#     @auth_ns.response(200, 'Logout sukses')
#     @auth_ns.response(401, 'Token tidak valid atau kadaluarsa')
#     @jwt_required()  # Pastikan pengguna terautentikasi dengan JWT
#     def post(self):
#         """Logout dengan mencabut token"""
#         try:
#             # Ambil ID pengguna dari token
#             current_user = get_jwt_identity()

#             # Ambil JTI (JWT ID) dari token untuk blacklist
#             jti = get_jwt()['jti']

#             # Masukkan JTI ke blacklist (dalam memori atau database)
#             blacklist.add(jti)

#             return {"message": "Logout sukses"}, 200
#         except Exception as e:
#             return {"error": str(e)}, 500