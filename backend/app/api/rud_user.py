from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify
from app.extensions import mysql  # Mengimpor mysql connection

user_model = {
    'id': fields.Integer(required=True, description='ID pengguna'),
    'name': fields.String(required=True, description='Nama pengguna'),
    'email': fields.String(required=True, description='Email pengguna'),
    'role': fields.String(required=True, description='Role pengguna'),
}

user_ns = Namespace('users', description='Operasi pengguna')

@user_ns.route('/')
class UserList(Resource):
    @user_ns.doc('get_all_users')
    @jwt_required()
    def get(self):
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users")
            users = cursor.fetchall()
            
            result = []
            for user in users:
                result.append({
                    'id': user[0],
                    'name': user[1],
                    'email': user[2],
                    'role': user[4]
                })

            return result, 200
        except Exception as e:
            return {"error": str(e)}, 500



@user_ns.route('/<int:id>')
class User(Resource):
    @user_ns.doc('get_user')
    @user_ns.response(200, 'Sukses mendapatkan data pengguna')
    @user_ns.response(404, 'Pengguna tidak ditemukan')
    @jwt_required()  # Memastikan pengguna terautentikasi
    def get(self, id):
        """Mengambil data pengguna berdasarkan ID"""
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
            user = cursor.fetchone()
            
            if user:
                return {
                    'id': user[0],
                    'name': user[1],
                    'email': user[2],
                    'role': user[4]
                }, 200
            else:
                return {"error": "User not found"}, 404

        except Exception as e:
            return {"error": str(e)}, 500

    @user_ns.doc('update_user')
    @user_ns.response(200, 'Sukses memperbarui data pengguna')
    @user_ns.response(404, 'Pengguna tidak ditemukan')
    @user_ns.response(400, 'Request body tidak valid')
    @jwt_required()  # Memastikan pengguna terautentikasi
    def put(self, id):
        """Mengupdate data pengguna berdasarkan ID"""
        try:
            # Ambil data yang dikirimkan
            data = request.get_json()
            name = data.get('name')
            email = data.get('email')
            role = data.get('role')

            if not name or not email or not role:
                return {"error": "Missing required fields"}, 400

            cursor = mysql.connection.cursor()
            cursor.execute("UPDATE users SET name = %s, email = %s, role = %s WHERE id = %s",
                           (name, email, role, id))
            mysql.connection.commit()

            # Periksa apakah data sudah terupdate
            cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
            user = cursor.fetchone()

            if user:
                return {
                    'id': user[0],
                    'name': user[1],
                    'email': user[2],
                    'role': user[4]
                }, 200
            else:
                return {"error": "User not found"}, 404

        except Exception as e:
            return {"error": str(e)}, 500

    @user_ns.doc('delete_user')
    @user_ns.response(200, 'Sukses menghapus data pengguna')
    @user_ns.response(404, 'Pengguna tidak ditemukan')
    @jwt_required()  # Memastikan pengguna terautentikasi
    def delete(self, id):
        """Menghapus data pengguna berdasarkan ID"""
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
            user = cursor.fetchone()

            if user:
                cursor.execute("DELETE FROM users WHERE id = %s", (id,))
                mysql.connection.commit()
                return {"message": "User deleted successfully"}, 200
            else:
                return {"error": "User not found"}, 404

        except Exception as e:
            return {"error": str(e)}, 500
