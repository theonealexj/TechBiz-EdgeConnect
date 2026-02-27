from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
# Allow cross origin requests so our React frontend can query the model
CORS(app)

import os

# Load the provided model
model_path = os.path.join(os.path.dirname(__file__), 'edge_ai_combined_model_01.pkl')
try:
    with open(model_path, 'rb') as f:
        model_data = pickle.load(f)
        
    print(f"Model loaded successfully. Type: {type(model_data)}")
except Exception as e:
    print(f"Error loading model: {e}")
    model_data = None

@app.route('/edge-ai/predict', methods=['POST'])
def predict():
    data = request.json
    if not data:
        return jsonify({"error": "No input provided"}), 400

    network_speed = data.get('networkSpeed', 1000)
    battery = data.get('battery', 100)
    battery = 30
    cpu_usage = data.get('cpuUsage', 0)
    cpu_usage = 80
    content_type = data.get('contentType', 'video')

    # Basic threshold mappings for fallback or when the generic predictor is used
    quality = 100
    resolution = 1080

    try:
        # If the model is a scikit-learn model, predict ideal load time logic
        if hasattr(model_data, 'predict'):
            # Model expects [bandwidth_kbps, simulated_size_mb, ping_ms] proxy inputs
            input_features = np.array([[network_speed, float(battery), float(cpu_usage)]])
            pred_time = model_data.predict(input_features)[0]
            print(f"Model predicted constraint value: {pred_time}")
            
            # Use the prediction to define aggressiveness
            if pred_time > 8.0:
                quality = 50
                resolution = 360
            elif pred_time > 4.0:
                quality = 70
                resolution = 480
            else:
                quality = 80
                resolution = 720
        else:
            # Fallback scaling
            if network_speed < 800 or battery < 20 or cpu_usage > 90:
                quality = 50
                resolution = 360
            elif network_speed <= 2000 or battery < 50 or cpu_usage > 75:
                quality = 70
                resolution = 480
            else:
                quality = 80
                resolution = 720
                
    except Exception as e:
        print(f"Inference error: {e}")
        # Standard rules engine on fail
        if network_speed < 800 or battery < 20 or cpu_usage > 90:
            quality = 50
            resolution = 360
        elif network_speed <= 2000 or battery < 50 or cpu_usage > 75:
            quality = 70
            resolution = 480

    return jsonify({
        "quality": quality,
        "resolution": resolution
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
