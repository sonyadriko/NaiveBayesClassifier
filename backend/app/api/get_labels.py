from flask import request, jsonify
from flask_restx import Namespace, Resource
from app.services.file_processor import label_encoders

# Define Namespace for get_labels
get_labels_bp = Namespace('get_labels', description='Route to retrieve encoded labels')

@get_labels_bp.route('/get_labels', methods=['GET'])
class GetLabels(Resource):
    @get_labels_bp.doc('get_labels_info')  # Swagger documentation for this route
    @get_labels_bp.response(200, 'Successfully retrieved labels')  # 200 response
    @get_labels_bp.response(400, 'Error in retrieving labels')  # 400 response for errors
    def get(self):
        try:
            # Check if label_encoders have been created (i.e., a file has been uploaded)
            if not label_encoders:
                return jsonify({"error": "No encoded labels found. Please upload a file first."}), 400
            
            # Create a dictionary with label encoding details
            labels_info = {}
            for column, encoder in label_encoders.items():
                labels_info[column] = {
                    'encoded_values': {i: label for i, label in enumerate(encoder.classes_)},
                    'classes': encoder.classes_.tolist()
                }
            
            # Return the label information in JSON format
            return jsonify({"labels": labels_info}), 200

        except Exception as e:
            # Handle any error and return the error message
            return jsonify({"error": str(e)}), 400
