import React from 'react'

// MedXpert Images
import medxpertOriginal from '../assets/images/image_original.png'
import medxpert2 from '../assets/images/2.png'
import medxpert3 from '../assets/images/3.png'
import medxpert4 from '../assets/images/4.png'
import medxpert6 from '../assets/images/6.png'
import medxpert7 from '../assets/images/7.png'
import medxpert8 from '../assets/images/8.png'
import medxpert9 from '../assets/images/9.png'
import medxpert11 from '../assets/images/11.png'

// Yosr Images
import formImg from '../assets/images/form.jpeg'
import finalFormImg from '../assets/images/final_form.jpeg'
import scannerImg from '../assets/images/scanner.jpeg'
import screen1Img from '../assets/images/screen1.jpeg'
import screen2Img from '../assets/images/screen2.jpeg'
import screen3Img from '../assets/images/screen3.jpeg'
import screen4Img from '../assets/images/screen4.jpeg'
import screen5Img from '../assets/images/screen5.jpeg'

export const projects = [
    {
        id: 'medxpert',
        title: 'MedXpert',
        category: 'Medical AI Diagnostic Platform',
        description: 'Deep learning models for brain tumor segmentation (U-Net) and CNN classifiers for skin cancer & chest X-rays. Implemented data augmentation and transfer learning.',
        fullDescription: `
            MedXpert is a comprehensive medical diagnostic platform powered by advanced deep learning models. 
            It is designed to assist healthcare professionals in diagnosing various conditions with high accuracy.
            
            ### Key Features:
            - **Brain Tumor Segmentation**: Utilizes U-Net architecture for precise segmentation of brain tumors from MRI scans.
            - **Skin Cancer Classification**: CNN-based classifier to distinguish between benign and malignant skin lesions.
            - **Chest X-Ray Analysis**: Automated detection of pneumonia and other chest abnormalities.
            - **User-Friendly Interface**: Intuitive web interface for uploading scans and visualizing results.
        `,
        tags: ['Python', 'Deep Learning', 'CNN', 'U-Net', 'Medical Imaging'],
        links: { github: 'https://github.com/mohamed-alawy/medxpert', demo: '#' },
        images: [
            medxpert2,
            medxpert3,
            medxpert4,
            medxpert6,
            medxpert7,
            medxpert8,
            medxpert9,
            medxpert11,
            medxpertOriginal
        ]
    },
    {
        id: 'yosr',
        title: 'Yosr',
        category: 'AI Accessibility Assistant',
        description: 'Real-time form detection and filling assistant for visually impaired users. Features on-device ONNX models for detection & orientation, with a robust backend for processing, validation, and smart field mapping using Gemini & Gemini Nano.',
        fullDescription: `
            Yosr is an advanced accessibility application designed to help visually impaired individuals interact with physical forms independently.
            The system employs a hybrid architecture, combining fast on-device models for real-time guidance with powerful backend models for precise processing.
            
            ### Technical Workflow:
            - **On-Device Real-time Analysis**: 
                - Uses **two ONNX models** running locally on the app.
                - **Model 1**: Detects forms in real-time.
                - **Model 2**: specific model to determine the orientation of the document (upright vs. inverted).
            
            - **Backend Processing Pipeline**:
                - **Advanced Cropping**: A specialized model precisely segments the form from the background.
                - **Common Form Model**: A dedicated model identifies field locations and specifically targets the signature area, which is handled separately from Gemini.
                - **Gemini Validation & OCR**: The image is sent to Gemini to:
                    1. Validate it's a correct, clear, and un-inverted form.
                    2. Extract all text content simultaneously.
                - **Smart Field Mapping**: 
                    - Gemini extracts field names and the signature location (indexed via the Common Form model).
                    - **Gemini Nano** is then used to map user input data to these specific fields.
                    - The **Signature** is placed manually using the precise coordinates extracted by the system.
        `,
        tags: ['FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'Docker', 'ONNX', 'YOLO', 'Gemini Nano', 'Computer Vision'],
        links: { github: null, demo: 'https://apps.apple.com/us/app/%D9%8A%D8%B3%D8%B1/id6752940380' },
        demoLabel: 'App Store',
        images: [
            screen1Img,
            screen2Img,
            scannerImg,
            screen3Img,
            screen4Img,
            screen5Img,
            formImg,
            finalFormImg
        ]
    },
    {
        id: 'atlas',
        title: 'Atlas',
        category: 'RAG Backend System',
        description: 'High-performance RAG pipeline using FastAPI & Celery. Features async document processing (chunking -> embedding -> Vector DB), semantic search via PostgreSQL (pgvector), and scalable architecture with RabbitMQ & Redis.',
        fullDescription: `
            Atlas is a robust backend system designed for Retrieval-Augmented Generation (RAG) applications.
            It handles large-scale document processing and semantic search with efficiency and scalability.
            
            ### Architecture:
            - **FastAPI**: High-performance web framework for the API layer.
            - **Celery & RabbitMQ**: Asynchronous task queue for handling heavy document processing jobs without blocking the main thread.
            - **Redis**: Caching layer to speed up frequent queries and manage task states.
            - **PostgreSQL & pgvector**: Vector database for storing embeddings and performing efficient semantic similarity searches.
            
            ### Capabilities:
            - **Document Ingestion**: Supports parsing and chunking of various document formats (PDF, DOCX, TXT).
            - **Embedding Generation**: converting text chunks into vector embeddings using state-of-the-art models.
            - **Context-Aware Retrieval**: Retrieves the most relevant context for LLM queries to reduce hallucinations.
        `,
        tags: ['FastAPI', 'Celery', 'RabbitMQ', 'Redis', 'PostgreSQL', 'Docker'],
        links: { github: 'https://github.com/mohamed-alawy/Atlas', demo: null },
        images: []
    }
]
