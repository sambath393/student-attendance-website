/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

export default function FaceComparePage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [result, setResult] = useState(null);

  // Example: Array of reference images (you can load these dynamically)
  const referenceImages = [
    { label: 'Try Sambath', url: '/assets/sambath.jpg' },
    { label: 'Pheakdey Rotana', url: '/assets/rotana.jpg' },
  ];

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
      console.log('✅ FaceAPI models loaded');
    };
    loadModels();
  }, []);

  // Load all reference faces
  useEffect(() => {
    const loadReferenceFaces = async () => {
      const labeledDescriptors = [];

      for (const ref of referenceImages) {
        const img = await faceapi.fetchImage(ref.url);
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          labeledDescriptors.push(
            new faceapi.LabeledFaceDescriptors(ref.label, [detection.descriptor])
          );
          console.log(`✅ Loaded descriptor for ${ref.label}`);
        } else {
          console.warn(`⚠️ No face found in ${ref.url}`);
        }
      }

      if (labeledDescriptors.length > 0) {
        const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
        setFaceMatcher(matcher);
        console.log('✅ Face matcher ready');
      } else {
        console.warn('⚠️ No valid reference faces loaded');
      }
    };

    if (modelsLoaded) loadReferenceFaces();
  }, [modelsLoaded]);

  // Handle webcam capture and comparison
  const handleCapture = async () => {
    if (!webcamRef.current || !faceMatcher) return;

    const video = webcamRef.current.video;
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setResult({ match: false, label: 'No face detected', distance: null });
      return;
    }

    const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
    console.log('✅ Match result:', bestMatch);

    const match = bestMatch.label !== 'unknown';
    setResult({ match, label: bestMatch.label, distance: bestMatch.distance.toFixed(4) });

    // Draw box
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvasRef.current, displaySize);
    const resizedDetections = faceapi.resizeResults(detection, displaySize);
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, displaySize.width, displaySize.height);
    faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
  };

  return (
    <div className='face-page'>
      <div className='main'>
        <div className='left-panel'>
          <div style={{ position: 'relative', width: 320, height: 480 }}>
            <Webcam
              ref={webcamRef}
              width={320}
              height={480}
              videoConstraints={{ width: 320, height: 480 }}
              style={{ borderRadius: 15 }}
            />
            <canvas
              ref={canvasRef}
              width={320}
              height={480}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        </div>

        <div className='right-panel'>
          <h1>Student Attendance</h1>

          <div className='btn-checkid-cover'>
            <button onClick={handleCapture} className='btn-checkid'>
              Check In
            </button>
          </div>

          {result && (
            <div>
              <p>Result: {result.match ? '✅ Found' : '❌ Not found'}</p>
              <p>Student Name: {result.label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
