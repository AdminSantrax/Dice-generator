from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, RoleEnum

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password') or not data.get('username'):
        return jsonify({"msg": "Faltan datos requeridos"}), 400
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "El email ya está registrado"}), 400
        
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "El nombre de usuario ya está en uso"}), 400

    role_value = data.get('role', 'jugador').lower()
    if role_value == 'admin':
        return jsonify({"msg": "No puedes registrarte como admin"}), 403
        
    try:
        role = RoleEnum(role_value)
    except ValueError:
        return jsonify({"msg": "Rol no válido"}), 400

    new_user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        role=role
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "Usuario registrado exitosamente", "user": new_user.to_dict()}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Faltan credenciales"}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401
        
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "access_token": access_token, 
        "user": user.to_dict()
    }), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
        
    return jsonify(user.to_dict()), 200
